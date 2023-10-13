import { WebSocketGateway } from "@nestjs/websockets";

import { BaseK8sGateway } from "../../base/base-k8s.gateway";
import { PodService } from "./pod.service";

@WebSocketGateway({ path: "/api/v1/ws/pod" })
export class PodGateway extends BaseK8sGateway {
  constructor(private readonly podService: PodService) {
    super(podService);
  }
}
