import { Controller, Get, Param, Query } from "@nestjs/common";

import { ResourceTypes } from "@k8sd/shared";

import { Namespace } from "../../../decorators/namespace.decorator";
import { PodService } from "./pod.service";

@Controller([
  `k8s/v1/${ResourceTypes.NAMESPACE}/:namespace/resource/${ResourceTypes.POD}`,
  `k8s/v1/${ResourceTypes.POD}`
])
export class PodController {
  constructor(private readonly podService: PodService) {}

  @Get()
  getPodResource(@Namespace() namespace: string) {
    return this.podService.getPodResource(namespace);
  }
}
