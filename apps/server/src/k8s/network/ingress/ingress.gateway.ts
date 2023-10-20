import { WebSocketGateway } from "@nestjs/websockets";

import { K8sGateway } from "../../../base/k8s.gateway";
import { IngressService } from "./ingress.service";

@WebSocketGateway({ path: "/ws/k8s/v1/resource/ingress" })
export class IngressGateway extends K8sGateway {
  constructor(private readonly ingressService: IngressService) {
    super(ingressService);
  }
}
