import { Controller, Get, Param, Query } from "@nestjs/common";

import { DaemonSetService } from "./daemon-set.service";


@Controller(["k8s/v1/namespace/:namespace/resource/daemon-set", "k8s/v1/daemon-set"])
export class DaemonSetController {
  constructor(private readonly daemonSetService: DaemonSetService) {}

  @Get()
  getDaemonSetResource(
    @Param("namespace")
    namespaceParam: string,
    @Query("namespace")
    namespaceQuery: string
  ) {
    return this.daemonSetService.getDaemonSetResource(namespaceParam || namespaceQuery);
  }
}