import { Controller, Get, Param, Query } from "@nestjs/common";

import { ResourceTypes } from "@k8sd/shared";

import { Namespace } from "../../../decorators/namespace.decorator";
import { HorizontalPodAutoscalerService } from "./horizontal-pod-autoscaler.service";

@Controller([
  `k8s/v1/${ResourceTypes.NAMESPACE}/:namespace/resource/${ResourceTypes.HORIZONTAL_POD_AUTOSCALER}`,
  `k8s/v1/${ResourceTypes.HORIZONTAL_POD_AUTOSCALER}`
])
export class HorizontalPodAutoscalerController {
  constructor(private readonly horizontalPodAutoscalerService: HorizontalPodAutoscalerService) {}

  @Get()
  getHorizontalPodAutoscalerResource(@Namespace() namespace: string) {
    return this.horizontalPodAutoscalerService.getHorizontalPodAutoscalerResource(namespace);
  }
}
