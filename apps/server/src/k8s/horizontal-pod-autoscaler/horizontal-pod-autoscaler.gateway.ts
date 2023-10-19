import { WebSocketGateway } from "@nestjs/websockets";

import { BaseK8sGateway } from "../../base/base-k8s.gateway";
import { HorizontalPodAutoscalerService } from "./horizontal-pod-autoscaler.service";

@WebSocketGateway({ path: "/ws/k8s/v1/resource/horizontal-pod-autoscaler" })
export class HorizontalPodAutoscalerGateway extends BaseK8sGateway {
  constructor(private readonly horizontalPodAutoscalerService: HorizontalPodAutoscalerService) {
    super(horizontalPodAutoscalerService);
  }
}
