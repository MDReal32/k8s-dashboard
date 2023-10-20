import { Controller, Get, Param, Query } from "@nestjs/common";

import { CronJobService } from "./cron-job.service";


@Controller(["k8s/v1/namespace/:namespace/resource/cron-job", "k8s/v1/cron-job"])
export class CronJobController {
  constructor(private readonly cronJobService: CronJobService) {}

  @Get()
  getCronJobResource(
    @Param("namespace")
    namespaceParam: string,
    @Query("namespace")
    namespaceQuery: string
  ) {
    return this.cronJobService.getCronJobResource(namespaceParam || namespaceQuery);
  }
}