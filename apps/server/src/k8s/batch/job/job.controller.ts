import { Controller, Get, Param, Query } from "@nestjs/common";

import { ResourceTypes } from "@k8sd/shared";

import { Namespace } from "../../../decorators/namespace.decorator";
import { JobService } from "./job.service";

@Controller([
  `k8s/v1/${ResourceTypes.NAMESPACE}/:namespace/resource/${ResourceTypes.JOB}`,
  `k8s/v1/${ResourceTypes.JOB}`
])
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  getJobResource(@Namespace() namespace: string) {
    return this.jobService.getJobResource(namespace);
  }
}
