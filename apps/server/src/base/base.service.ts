import { WebSocket } from "ws";

import { Injectable } from "@nestjs/common";

import { CORE_APP_NAME, Logger, WebSocketData, WS_EVENTS } from "@k8sd/shared";

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
    // ToDo: Handle client id through message.headers.Authorization
    this.broadcast(client, "welcome");
    this.clients.add(client);
  }

  remove(client: WebSocket) {
    // ToDo: Handle client id through message.headers.Authorization
    this.clients.delete(client);
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
