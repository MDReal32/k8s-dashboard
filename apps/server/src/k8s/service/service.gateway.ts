import { WebSocketGateway } from "@nestjs/websockets";

import { BaseK8sGateway } from "../../base/base-k8s.gateway";
import { ServiceService } from "./service.service";

@WebSocketGateway({ path: "/api/v1/ws/service" })
export class ServiceGateway extends BaseK8sGateway {
  constructor(private readonly serviceService: ServiceService) {
    super(serviceService);
  }
}
