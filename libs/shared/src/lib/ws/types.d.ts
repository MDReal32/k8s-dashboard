import "ws";

import { WebSocketData } from "@k8sd/shared";

declare module "ws" {
  interface WebSocket {
    message: WebSocketData;
  }
}
