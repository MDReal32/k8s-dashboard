import { WebSocketGateway } from "@nestjs/websockets";

import { BaseK8sGateway } from "../../../base/base-k8s.gateway";
import { PodService } from "./pod.service";


@WebSocketGateway({ path: "/ws/k8s/v1/resource/pod" })
export class PodGateway extends BaseK8sGateway {
  constructor(private readonly podService: PodService) {
    super(podService);
  }
}