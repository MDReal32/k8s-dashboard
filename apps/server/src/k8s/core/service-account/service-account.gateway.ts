import { WebSocketGateway } from "@nestjs/websockets";

import { BaseK8sGateway } from "../../../base/base-k8s.gateway";
import { ServiceAccountService } from "./service-account.service";

@WebSocketGateway({ path: "/ws/k8s/v1/resource/service-account" })
export class ServiceAccountGateway extends BaseK8sGateway {
  constructor(private readonly serviceAccountService: ServiceAccountService) {
    super(serviceAccountService);
  }
}
