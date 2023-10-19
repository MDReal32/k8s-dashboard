import { Controller, Get, Param, Query } from "@nestjs/common";

import { PodService } from "./pod.service";

@Controller(["k8s/v1/namespace/:namespace/resource/pod", "k8s/v1/pod"])
export class PodController {
  constructor(private readonly podService: PodService) {}

  @Get()
  getPodResource(
    @Param("namespace")
    namespaceParam: string,
    @Query("namespace")
    namespaceQuery: string
  ) {
    return this.podService.getPodResource(namespaceParam || namespaceQuery);
  }
}
