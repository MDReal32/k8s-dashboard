import { WebSocketGateway } from "@nestjs/websockets";

import { K8sGateway } from "../../../base/k8s.gateway";
import { NamespaceService } from "./namespace.service";


@WebSocketGateway({ path: "/ws/k8s/v1/resource/namespace" })
export class NamespaceGateway extends K8sGateway {
  constructor(private readonly namespaceService: NamespaceService) {
    super(namespaceService);
  }
}