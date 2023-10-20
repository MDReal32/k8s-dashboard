import { Controller, Get, Param, Query } from "@nestjs/common";

import { ServiceService } from "./service.service";


@Controller(["k8s/v1/namespace/:namespace/resource/service", "k8s/v1/service"])
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  getServiceResource(
    @Param("namespace")
    namespaceParam: string,
    @Query("namespace")
    namespaceQuery: string
  ) {
    return this.serviceService.getServiceResource(namespaceParam || namespaceQuery);
  }
}