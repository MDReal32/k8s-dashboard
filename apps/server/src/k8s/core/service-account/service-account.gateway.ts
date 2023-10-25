import { WebSocketGateway } from "@nestjs/websockets";

import { K8sGateway } from "../../../base/k8s.gateway";
import { ServiceAccountService } from "./service-account.service";


@WebSocketGateway({ path: "/ws/k8s/v1/resource/service-account" })
export class ServiceAccountGateway extends K8sGateway {
  constructor(private readonly serviceAccountService: ServiceAccountService) {
    super(serviceAccountService);
  }
}