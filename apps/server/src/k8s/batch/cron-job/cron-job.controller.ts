import { Controller, Get } from "@nestjs/common";

import { ResourceTypes } from "@k8sd/shared";

import { Namespace } from "../../../decorators/namespace.decorator";
import { CronJobService } from "./cron-job.service";


@Controller([
  `k8s/v1/${ResourceTypes.NAMESPACE}/:namespace/resource/${ResourceTypes.CRON_JOB}`,
  `k8s/v1/${ResourceTypes.CRON_JOB}`
])
export class CronJobController {
  constructor(private readonly cronJobService: CronJobService) {}

  @Get()
  getCronJobResource(@Namespace() namespace: string) {
    return this.cronJobService.getCronJobResource(namespace);
  }
}