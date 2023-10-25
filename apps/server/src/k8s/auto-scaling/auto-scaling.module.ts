import { Logger, Module } from "@nestjs/common";

import { AutoScalingService } from "./auto-scaling.service";
import { HorizontalPodAutoscalerModule } from "./horizontal-pod-autoscaler/horizontal-pod-autoscaler.module";

@Module({
  imports: [HorizontalPodAutoscalerModule],
  providers: [AutoScalingService, Logger],
  exports: [AutoScalingService]
})
export class AutoScalingModule {}
