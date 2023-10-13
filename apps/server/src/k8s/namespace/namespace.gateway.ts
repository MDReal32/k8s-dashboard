import { WebSocketGateway } from "@nestjs/websockets";

import { BaseK8sGateway } from "../../base/base-k8s.gateway";
import { NamespaceService } from "./namespace.service";

@WebSocketGateway({ path: "/ws/k8s/v1/resource/namespace" })
export class NamespaceGateway extends BaseK8sGateway {
  constructor(private readonly namespaceService: NamespaceService) {
    super(namespaceService);
  }
}
