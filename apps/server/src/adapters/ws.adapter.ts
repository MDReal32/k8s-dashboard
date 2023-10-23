import { WebSocket } from "ws";
import { WsAdapter as _WsAdapter } from "@nestjs/platform-ws";
import { MessageMappingProperties } from "@nestjs/websockets";
import { CLOSE_EVENT } from "@nestjs/websockets/constants";
import { first, fromEvent, map, Observable, share, takeUntil } from "rxjs";

import { WebSocketData } from "@k8sd/shared";

declare module "ws" {
  interface WebSocket {
    id: string;
    message: WebSocketData;
  }
}

export class WsAdapter extends _WsAdapter {
  bindMessageHandlers(
    client: WebSocket,
    handlers: MessageMappingProperties[],
    transform: <T>(data: T) => Observable<T>
  ) {
    super.bindMessageHandlers(client, handlers, transform);

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
