import { Controller, Get, Param, Query } from "@nestjs/common";

import { JobService } from "./job.service";

@Controller(["k8s/v1/namespace/:namespace/resource/job", "k8s/v1/job"])
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  getPodResource(
    @Param("namespace")
    namespaceParam: string,
    @Query("namespace")
    namespaceQuery: string
  ) {
    return this.jobService.getJobResource(namespaceParam || namespaceQuery);
  }
}
