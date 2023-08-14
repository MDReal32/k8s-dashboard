import { Module } from "@nestjs/common";
import { HorizontalPodAutoscalerController } from "./horizontal-pod-autoscaler.controller";
import { HorizontalPodAutoscalerGateway } from "./horizontal-pod-autoscaler.gateway";
import { HorizontalPodAutoscalerService } from "./horizontal-pod-autoscaler.service";

@Module({
  controllers: [HorizontalPodAutoscalerController],
  providers: [HorizontalPodAutoscalerGateway, HorizontalPodAutoscalerService]
})
export class HorizontalPodAutoscalerModule {}
