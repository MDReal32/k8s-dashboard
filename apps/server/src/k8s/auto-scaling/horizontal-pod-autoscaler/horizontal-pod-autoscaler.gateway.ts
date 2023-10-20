import { WebSocketGateway } from "@nestjs/websockets";

import { K8sGateway } from "../../../base/k8s.gateway";
import { HorizontalPodAutoscalerService } from "./horizontal-pod-autoscaler.service";

@WebSocketGateway({ path: "/ws/k8s/v1/resource/horizontal-pod-autoscaler" })
export class HorizontalPodAutoscalerGateway extends K8sGateway {
  constructor(private readonly horizontalPodAutoscalerService: HorizontalPodAutoscalerService) {
    super(horizontalPodAutoscalerService);
  }
}
