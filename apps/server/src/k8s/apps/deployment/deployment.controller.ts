import { Controller, Get, Param, Query } from "@nestjs/common";

import { ResourceTypes } from "@k8sd/shared";

import { Namespace } from "../../../decorators/namespace.decorator";
import { DeploymentService } from "./deployment.service";

@Controller([
  `k8s/v1/${ResourceTypes.NAMESPACE}/:namespace/resource/${ResourceTypes.DEPLOYMENT}`,
  `k8s/v1/${ResourceTypes.DEPLOYMENT}`
])
export class DeploymentController {
  constructor(private readonly deploymentService: DeploymentService) {}

  @Get()
  getDeploymentResource(@Namespace() namespace: string) {
    return this.deploymentService.getDeploymentResource(namespace);
  }
}
