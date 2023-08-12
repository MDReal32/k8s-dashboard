import crypto from "node:crypto";

import { WebSocket } from "ws";
import { Injectable } from "@nestjs/common";

import { CORE_APP_NAME, Logger, WebSocketData, WS_EVENTS } from "@k8sd/shared";

type PrismaCRUDActions = "create" | "createOrConnect" | "connect" | "update";
type PrismaCRUDData<T, TO extends PrismaCRUDActions> = {
  [Key in keyof T]-?: T[Key] extends object
    ? {
        [K in TO]-?: TO extends "create"
          ? PrismaCRUDData<T[Key], TO>
          : TO extends "update"
          ? { data: PrismaCRUDData<T[Key], TO> }
          : never;
      }
    : T[Key];
};

@Injectable()
export class BaseService {
  private static readonly _clients: Set<WebSocket> = new Set();
  private static readonly _idClientMap: Map<string, WebSocket> = new Map();
  private static coreAppId: string;

  private readonly _logger = new Logger("BaseService");

  protected get coreAppId() {
    return BaseService.coreAppId;
  }

  protected set coreAppId(id: string) {
    BaseService.coreAppId = id;
  }

  protected get clients() {
    return BaseService._clients;
  }

  protected get idClientMap() {
    return BaseService._idClientMap;
  }

  add(client: WebSocket) {
    if (!this.idClientMap.has(client.id)) {
      client.id ||= crypto.randomBytes(16).toString("hex");
      this.broadcast(client, WS_EVENTS.WELCOME);
      this.clients.add(client);
      this.idClientMap.set(client.id, client);
    }
  }

  remove(client: WebSocket) {
    if (this.idClientMap.has(client.id)) {
      this.broadcast(client, WS_EVENTS.GOODBYE);
      this.clients.delete(client);
      this.idClientMap.delete(client.id);

      if (this.coreAppId === client.id) {
        this.coreAppId = undefined;
      }
    }
  }

  introduce(client: WebSocket, data: string) {
    if (data === CORE_APP_NAME && !(this.coreAppId && client.id === this.coreAppId)) {
      this._logger.log(`Client ${client.id} registered as core-app`);
      this.clients.delete(client);
      this.coreAppId = client.id;
    }
  }

  triggerCore<T, H extends object>(event: string, data?: T, headers?: H) {
    if (this.coreAppId) {
      this._logger.log(`Triggering core-app with event ${event}`);
      this.broadcast(this.coreAppId, event, data, headers);
    }
  }

  protected toCreate<T>(data: T, connect?: false): PrismaCRUDData<T, "create">;
  protected toCreate<T>(data: T, connect: "or"): PrismaCRUDData<T, "createOrConnect">;
  protected toCreate<T>(data: T, connect: true): PrismaCRUDData<T, "connect">;
  protected toCreate<T>(data: T, connect: boolean | "or" = false) {
    return this.to(data, connect ? "connect" : connect === "or" ? "createOrConnect" : "create");
  }

  protected toUpdate<T>(data: T) {
    return this.to(data, "update");
  }

  private to<T, Action extends PrismaCRUDActions>(
    data: T,
    type: Action
  ): PrismaCRUDData<T, Action> {
    const newData: any = {};

    for (const key in data) {
      if (data && data[key]) {
        const value = data[key];

        if (typeof value === "object") {
          if (type === "update") {
            newData[key] = { [type]: { data: this.to(value, type) } };
          } else {
            newData[key] = { [type]: this.to(value, type) };
          }
        } else {
          newData[key] = value;
        }
      }
    }

    return newData;
  }

  protected broadcast<T, H extends object>(
    client: WebSocket | string,
    event: string,
    data?: T,
    headers?: H
  ): void;
  protected broadcast<T, H extends object>(
    client: WebSocket | string,
    payload: WebSocketData<T, H>
  ): void;
  protected broadcast<T, H extends object>(
    client: WebSocket | string,
    eventOrData: string | WebSocketData<T, H>,
    data?: T,
    headers?: H
  ) {
    let event: string;
    if (typeof eventOrData === "string") {
      event = eventOrData;
    } else {
      event = eventOrData.event;
      data = eventOrData.data;
      headers = eventOrData.headers;
    }

    const response: WebSocketData<T> = { event, data, headers };
    const foundClient = typeof client === "string" ? this.idClientMap.get(client) : client;
    if (foundClient) {
      foundClient.send(JSON.stringify(response));
    }
  }

  protected broadcastAll<T, H extends object>(event: string, data: T, headers: H) {
    this.clients.forEach(client => this.broadcast(client, event, data, headers));
  }
}
