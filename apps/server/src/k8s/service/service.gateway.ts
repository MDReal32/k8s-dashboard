import { WebSocketGateway } from "@nestjs/websockets";

import { BaseK8sGateway } from "../../base/base-k8s.gateway";
import { ServiceService } from "./service.service";

@WebSocketGateway({ path: "/ws/k8s/v1/resource/service" })
export class ServiceGateway extends BaseK8sGateway {
  constructor(private readonly serviceService: ServiceService) {
    super(serviceService);
  }
}
