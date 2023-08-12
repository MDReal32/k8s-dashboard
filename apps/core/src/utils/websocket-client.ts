import { WebSocket } from "ws";

import { Logger } from "@k8sd/shared";

type BaseHandlers = Record<
  "connect" | "connection" | "reconnect" | "reconnection" | "disconnect",
  () => void
>;

type WsCallback<T = unknown> = (data: T, headers?: object) => void;

type ArrayBased<T> = { [K in keyof T]: T[K][] };

export class WebsocketClient {
  private static readonly __baseEvents: (keyof BaseHandlers)[] = [
    "connect",
    "connection",
    "reconnect",
    "reconnection",
    "disconnect"
  ];

  private readonly logger = new Logger("WebsocketClient");

  private ws: WebSocket;

  private _connected = false;
  private _reconnects = 0;
  private _maxReconnects = 20;
  private _firstConnection = true;

  private readonly baseEventHandlers = {} as ArrayBased<BaseHandlers>;
  private readonly __handlers = new Map<string, WsCallback[]>();

  constructor(
    private readonly url: string,
    private waitTimer = 1,
    private waitSeed = waitTimer,
    private multiplier = 1.5
  ) {}

  connect() {
    const connectionPrefix = this._firstConnection ? "Connecting" : "Reconnecting";
    if (!this._reconnects) {
      this.logger.log(`${connectionPrefix} to ${this.url}`);
    }

    this._reconnects++;
    this.ws = new WebSocket(this.url);
    this.ws.on("open", () => {
      this._connected = true;
      this._reconnects = 0;
      this._firstConnection = false;

      const eventPrefix = this._firstConnection ? "connect" : "reconnect";
      this.emit(eventPrefix);
      this.emit(`${eventPrefix}ion`);

      this.waitTimer = this.waitSeed;
      this.logger.log(`Connected to ${this.url}`);
    });

    this.ws.on("message", rawData => {
      const { event, data = {}, headers = {} } = JSON.parse(rawData.toString());
      this.logger.log(`Received event ${event}`);

      if (this.__handlers.has(event)) {
        this.__handlers.get(event).forEach(cb => cb(data, headers));
      }
    });

    this.ws.on("error", err => {
      if (this._reconnects > this._maxReconnects) {
        throw err;
      }
    });

    this.ws.on("close", () => {
      this.reconnect();
    });

    return this;
  }

  reconnect() {
    this.ws.close();
    this.logger.log(`Re-trying after ${this.waitTimer}s`);

    setTimeout(() => {
      this.connect();
    }, this.waitTimer * 1e3);

    if (this.waitTimer < 60) this.waitTimer = +(this.waitTimer * this.multiplier).toFixed(2);
  }

  emit<K extends keyof BaseHandlers>(event: K): this;
  emit(event: string, data?: unknown, headers?: object): this;
  emit(event: string, data?: unknown, headers?: object) {
    if (this._connected) {
      if (WebsocketClient.__baseEvents.includes(event as keyof BaseHandlers)) {
        this.baseEventHandlers[event as keyof BaseHandlers]?.forEach(cb => cb());
        return this;
      }

      this.send(event, data, headers);
      return this;
    }

    this.on("connection", () => {
      this.send(event, data, headers);
    });

    return this;
  }

  on<T>(event: string, cb: WsCallback<T>): this;
  on<Event extends keyof BaseHandlers>(event: Event | Event[], cb: BaseHandlers[Event]): this;
  on(event: string | string[], cb: WsCallback) {
    const events = Array.isArray(event) ? event : [event];
    const baseEvents = events.filter(event =>
      WebsocketClient.__baseEvents.includes(event as keyof BaseHandlers)
    );

    if (baseEvents.length) {
      baseEvents.forEach(event => {
        this.baseEventHandlers[event] ||= [];
        this.baseEventHandlers[event].push(cb);
      });

      return this;
    }

    events.forEach(event => {
      const handlers = this.__handlers.get(event) || [];
      handlers.push(cb);
      this.__handlers.set(event, handlers);
    });

    return this;
  }

  private send(event: string, data: unknown, headers?: object) {
    this.ws.send(JSON.stringify({ event, data, headers }));
  }
}
