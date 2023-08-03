import { WebSocket } from "ws";
import { OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";

import { BaseService } from "./base.service";

export class BaseGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly __baseService: BaseService) {}

  handleConnection(client: WebSocket) {
    this.__baseService.add(client);
  }

  handleDisconnect(client: WebSocket) {
    this.__baseService.remove(client);
  }
}
