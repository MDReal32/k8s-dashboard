import { WebSocket } from "ws";

import { ConnectedSocket, OnGatewayConnection, SubscribeMessage } from "@nestjs/websockets";

import { BaseGateway } from "./base.gateway";
import { K8sService } from "./k8s.service";

export class BaseK8sGateway extends BaseGateway implements OnGatewayConnection {
  constructor(private readonly __service: K8sService) {
    super(__service);
  }

  @SubscribeMessage("watch")
  watchChanges(@ConnectedSocket() client: WebSocket) {
    this.__service.watch(client);
  }

  @SubscribeMessage("unwatch")
  unwatchChanges(@ConnectedSocket() client: WebSocket) {
    this.__service.unwatch(client);
  }
}
