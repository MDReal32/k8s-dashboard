import { WebSocket } from "ws";

import { Logger } from "../main";

interface WebsocketClientData<T = any> {
  event: string;
  data: T;
}

export class WebsocketClient<T> {
  private ws: WebSocket;
  private _connected = false;
  private reconnects = 0;
  private maxReconnects = 20;

  private readonly logger = new Logger("WebsocketClient");

  private _handlers: Map<string, ((data: any) => void)[]> = new Map();
  private _emits: Map<string, any[]> = new Map();

  constructor(
    private readonly url: string,
    private waitTimer = 1,
    private waitSeed = waitTimer,
    private multiplier = 2
  ) {}

  connect() {
    this.ws = new WebSocket(this.url);

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
    this.ws.on("open", () => {
      this._connected = true;
      this.reconnects = 0;
      this.waitTimer = this.waitSeed;
      this.logger.log(`Connected to ${this.url}`);

      if (this._emits) {
        this._emits.forEach((data, event) => {
          this.send(event, data);
        });
        this._emits = null;
      }
    });

    this.ws.on("message", rawData => {
      const datum = rawData.toString();
      const obj = JSON.parse(datum) as WebsocketClientData;
      const { event, data } = obj;
      const handlers = this._handlers.get(event);
      if (handlers) {
        handlers.forEach(handler => handler(data));
      }
    });

    return this;
  }

  emit(event: string, data: any);
  emit<K extends keyof T>(event: K, data: T[K]);
  emit(event: string, data: any) {
    if (!this._connected) {
      this._emits[event] ||= [];
      this._emits[event].push(data);
      return this;
    }
    this.send(event, data);
    return this;
  }

  on(event: string, cb: (data: any) => void);
  on<K extends keyof T>(event: K, cb: (data: T[K]) => void);
  on(event: string, cb: (data: any) => void) {
    this._handlers[event] ||= [];
    this._handlers[event].push(cb);
    return this;
  }

  private send(event: string, data: any) {
    this.ws.send(JSON.stringify({ event, data }));
  }
}
