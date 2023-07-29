import { WebSocket } from "ws";

interface WebsocketClientData<T = any> {
  event: string;
  data: T;
}

export class WebsocketClient<T> {
  private readonly ws: WebSocket;
  private _connected = false;

  private _handlers: Map<string, ((data: any) => void)[]> = new Map();
  private _emits: Map<string, any[]> = new Map();

  constructor(private readonly url: string) {
    this.ws = new WebSocket(url);
  }

  connect() {
    this.ws.on("open", () => {
      this._connected = true;

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
