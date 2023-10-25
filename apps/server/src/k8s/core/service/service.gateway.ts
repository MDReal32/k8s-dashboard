import { WebSocketGateway } from "@nestjs/websockets";

import { K8sGateway } from "../../../base/k8s.gateway";
import { ServiceService } from "./service.service";


@WebSocketGateway({ path: "/ws/k8s/v1/resource/service" })
export class ServiceGateway extends K8sGateway {
  constructor(private readonly serviceService: ServiceService) {
    super(serviceService);
  }
}