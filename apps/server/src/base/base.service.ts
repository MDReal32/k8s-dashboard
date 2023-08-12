import { WebSocket } from "ws";
import { Injectable } from "@nestjs/common";

import { WebSocketData, WS_EVENTS } from "@k8sd/shared";

@Injectable()
export class BaseService {
  protected readonly clients: Set<WebSocket> = new Set();
  protected readonly idClientMap: Map<string, WebSocket> = new Map();

  add(client: WebSocket) {
    this.clients.add(client);
    this.idClientMap.set(client.id, client);
    this.broadcast(client, WS_EVENTS.WELCOME);
  }

  remove(client: WebSocket) {
    this.broadcast(client, WS_EVENTS.GOODBYE);
    this.clients.delete(client);
    this.idClientMap.delete(client.id);
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
    foundClient.send(JSON.stringify(response));
  }

  protected broadcastAll<T, H extends object>(event: string, data: T, headers: H) {
    this.clients.forEach(client => this.broadcast(client, event, data, headers));
  }
}
