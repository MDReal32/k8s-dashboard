import { WebSocketGateway } from "@nestjs/websockets";

import { K8sGateway } from "../../../base/k8s.gateway";
import { EndpointService } from "./endpoint.service";


@WebSocketGateway({ path: "/ws/k8s/v1/resource/endpoint" })
export class EndpointGateway extends K8sGateway {
  constructor(private readonly endpointService: EndpointService) {
    super(endpointService);
  }
}