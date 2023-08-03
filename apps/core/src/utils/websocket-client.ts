import { WebSocket } from "ws";

import { Logger, WebSocketResponse } from "@ugrab/k8s-shared";

export class WebsocketClient<T> {
  private ws: WebSocket;
  private _connected = false;
  private reconnects = 0;
  private maxReconnects = 20;

  private onConnection: () => void;

  private readonly logger = new Logger("WebsocketClient");

  private readonly _handlers: Map<string, Set<(data: unknown, headers: unknown) => void>> =
    new Map();
  private readonly _emits: Map<string, Set<Omit<WebSocketResponse, "event">>> = new Map();

  constructor(
    private readonly url: string,
    private waitTimer = 1,
    private waitSeed = waitTimer,
    private multiplier = 2
  ) {
    this.logger.log(`Connecting to ${this.url}`);
  }

  connect() {
    this.ws = new WebSocket(this.url);

    this.ws.on("open", () => {
      this.onConnection?.();
    });

    this.ws.on("error", err => {
      if (this.reconnects > this.maxReconnects) {
        throw err;
      }

      this.reconnects++;
      this.logger.log(`Reconnecting after ${this.waitTimer}s`);

      setTimeout(() => {
        this.connect().handle();
      }, this.waitTimer * 1e3);

      if (this.waitTimer < 60) this.waitTimer = this.waitTimer * this.multiplier;
    });

    return this;
  }

  handle() {
    this.onConnection = () => {
      this._connected = true;
      this.waitTimer = this.waitSeed;
      this.logger.log(`Connected to ${this.url}`);

      if (this._emits) {
        this._emits.forEach((data, event) => {
          data.forEach(({ data, headers }) => {
            this.send(event, data, headers);
          });

          this._emits.delete(event);
        });
      }

      this.ws.on("message", rawData => {
        const datum = rawData.toString();
        const obj = JSON.parse(datum) as WebSocketResponse;
        const { event, data, headers } = obj;
        const handlers = this._handlers.get(event);
        if (handlers) {
          handlers.forEach(handler => handler(data, headers));
        }
      });

      this.ws.on("close", this.reconnect.bind(this));
    };

    return this;
  }

  reconnect() {
    this.ws.close();
    this._connected = false;
    this.logger.log(`Disconnected from ${this.url}`);
    this.logger.log(`Reconnecting to ${this.url}`);
    this.reconnects = 0;
    this.connect();
    if (this.onConnection) {
      delete this.onConnection;
      this.handle();
    }
  }

  emit(event: string, data: unknown, headers?: object): this;
  emit<K extends keyof T>(event: K, data: T[K], headers?: object): this;
  emit<K extends keyof T>(event: string, data: T[K], headers?: object) {
    if (!this._connected) {
      const eventEmits = this._emits.get(event) || new Set();
      eventEmits.add({ data, headers });
      this._emits.set(event, eventEmits);
      return this;
    }
    this.send(event, data);
    return this;
  }

  on(event: string, cb: (data: unknown, headers?: object) => void): this;
  on<K extends keyof T>(event: K, cb: (data: T[K], headers?: object) => void): this;
  on<K extends keyof T>(event: string, cb: (data: T[K], headers?: object) => void) {
    const handlers = this._handlers.get(event) || new Set();
    handlers.add(cb);
    this._handlers.set(event, handlers);
    return this;
  }

  private send(event: string, data: unknown, headers?: object) {
    this.ws.send(JSON.stringify({ event, data, headers }));
  }
}
