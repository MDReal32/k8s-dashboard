import { WebSocket } from "ws";
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from "@nestjs/websockets";

import { BaseService } from "./base.service";
import { WS_EVENTS } from "@k8sd/shared";

export class BaseGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly __baseService: BaseService) {}

  handleConnection(client: WebSocket) {
    this.__baseService.add(client);
  }

  handleDisconnect(client: WebSocket) {
    this.__baseService.remove(client);
  }

  @SubscribeMessage(WS_EVENTS.INTRODUCE)
  introduce(client: WebSocket, data: string) {
    this.__baseService.introduce(client, data);
  }
}
