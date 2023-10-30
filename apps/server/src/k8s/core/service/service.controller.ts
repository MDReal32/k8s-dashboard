import { Controller, Get } from "@nestjs/common";

import { ResourceTypes } from "@k8sd/shared";

import { Namespace } from "../../../decorators/namespace.decorator";
import { ServiceService } from "./service.service";


@Controller([
  `k8s/v1/${ResourceTypes.NAMESPACE}/:namespace/resource/${ResourceTypes.SERVICE}`,
  `k8s/v1/${ResourceTypes.SERVICE}`
])
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  getServiceResource(@Namespace() namespace: string) {
    return this.serviceService.getServiceResource(namespace);
  }
}