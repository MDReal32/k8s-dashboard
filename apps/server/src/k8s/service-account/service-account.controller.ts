import { Controller, Get, Param, Query } from "@nestjs/common";

import { ServiceAccountService } from "./service-account.service";

@Controller(["k8s/v1/namespace/:namespace/resource/service-account", "k8s/v1/service-account"])
export class ServiceAccountController {
  constructor(private readonly serviceAccountService: ServiceAccountService) {}

  @Get()
  getServiceAccountResource(
    @Param("namespace")
    namespaceParam: string,
    @Query("namespace")
    namespaceQuery: string
  ) {
    return this.serviceAccountService.getServiceAccountResource(namespaceParam || namespaceQuery);
  }
}
