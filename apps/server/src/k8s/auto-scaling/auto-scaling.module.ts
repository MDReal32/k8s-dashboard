import { Logger, Module, OnModuleInit } from "@nestjs/common";

import { AutoScalingService } from "./auto-scaling.service";
import { HorizontalPodAutoscalerModule } from "./horizontal-pod-autoscaler/horizontal-pod-autoscaler.module";

@Module({
  imports: [HorizontalPodAutoscalerModule],
  providers: [AutoScalingService, Logger],
  exports: [AutoScalingService]
})
export class AutoScalingModule implements OnModuleInit {
  constructor(private readonly appsService: AutoScalingService) {}

  async onModuleInit() {
    await this.appsService.init();
  }
}
