import * as crypto from "node:crypto";

import { WebSocket } from "ws";
import { WsAdapter as _WsAdapter } from "@nestjs/platform-ws";
import { MessageMappingProperties } from "@nestjs/websockets";
import { CLOSE_EVENT } from "@nestjs/websockets/constants";
import { first, fromEvent, map, Observable, share, takeUntil } from "rxjs";

import { WebSocketResponse } from "@ugrab/k8s-shared";

declare module "ws" {
  interface WebSocket {
    id: string;
    message: WebSocketResponse;
  }
}

export class WsAdapter extends _WsAdapter {
  bindMessageHandlers(
    client: WebSocket,
    handlers: MessageMappingProperties[],
    transform: <T>(data: T) => Observable<T>
  ) {
    super.bindMessageHandlers(client, handlers, transform);
    client.id = crypto.randomBytes(16).toString("hex");

    const close$ = fromEvent(client, CLOSE_EVENT).pipe(share(), first());
    fromEvent(client, "message")
      .pipe(
        map((ws: MessageEvent) => ws.data),
        map(data => JSON.parse(data)),
        takeUntil(close$)
      )
      .subscribe(message => {
        client.message = message;
      });
  }
}