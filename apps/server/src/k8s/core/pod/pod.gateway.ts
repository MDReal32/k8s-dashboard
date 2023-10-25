import { WebSocketGateway } from "@nestjs/websockets";

import { K8sGateway } from "../../../base/k8s.gateway";
import { PodService } from "./pod.service";


@WebSocketGateway({ path: "/ws/k8s/v1/resource/pod" })
export class PodGateway extends K8sGateway {
  constructor(private readonly podService: PodService) {
    super(podService);
  }
}