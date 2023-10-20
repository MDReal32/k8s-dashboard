import { WebSocketGateway } from "@nestjs/websockets";

import { BaseK8sGateway } from "../../../base/base-k8s.gateway";
import { IngressService } from "./ingress.service";

@WebSocketGateway({ path: "/ws/k8s/v1/resource/ingress" })
export class IngressGateway extends BaseK8sGateway {
  constructor(private readonly ingressService: IngressService) {
    super(ingressService);
  }
}
