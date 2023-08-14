import { Module } from "@nestjs/common";
import { VerticalPodAutoscalerController } from "./vertical-pod-autoscaler.controller";
import { VerticalPodAutoscalerGateway } from "./vertical-pod-autoscaler.gateway";
import { VerticalPodAutoscalerService } from "./vertical-pod-autoscaler.service";

@Module({
  controllers: [VerticalPodAutoscalerController],
  providers: [VerticalPodAutoscalerGateway, VerticalPodAutoscalerService]
})
export class VerticalPodAutoscalerModule {}
