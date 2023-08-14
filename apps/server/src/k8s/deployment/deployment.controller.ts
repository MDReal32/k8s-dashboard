import { Controller, Get, Param, Query } from "@nestjs/common";

import { DeploymentService } from "./deployment.service";

@Controller(["k8s/v1/namespace/:namespace/resource/deployment", "k8s/v1/deployment"])
export class DeploymentController {
  constructor(private readonly deploymentService: DeploymentService) {}

  @Get()
  getDeploymentResource(
    @Param("namespace")
    namespaceParam: string,
    @Query("namespace")
    namespaceQuery: string
  ) {
    return this.deploymentService.getDeploymentResource(namespaceParam || namespaceQuery);
  }
}
