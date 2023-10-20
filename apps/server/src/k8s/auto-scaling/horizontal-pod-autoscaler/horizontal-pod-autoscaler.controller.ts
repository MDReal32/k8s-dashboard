import { Controller, Get, Param, Query } from "@nestjs/common";

import { HorizontalPodAutoscalerService } from "./horizontal-pod-autoscaler.service";

@Controller([
  "k8s/v1/namespace/:namespace/resource/horizontal-pod-autoscaler",
  "k8s/v1/horizontal-pod-autoscaler"
])
export class HorizontalPodAutoscalerController {
  constructor(private readonly horizontalPodAutoscalerService: HorizontalPodAutoscalerService) {}

  @Get()
  getHorizontalPodAutoscalerResource(
    @Param("namespace")
    namespaceParam: string,
    @Query("namespace")
    namespaceQuery: string
  ) {
    return this.horizontalPodAutoscalerService.getHorizontalPodAutoscalerResource(
      namespaceParam || namespaceQuery
    );
  }
}
