import { Controller, Get, Param, Query } from "@nestjs/common";

import { IngressService } from "./ingress.service";

@Controller(["k8s/v1/namespace/:namespace/resource/ingress", "k8s/v1/ingress"])
export class IngressController {
  constructor(private readonly ingressService: IngressService) {}

  @Get()
  getIngressResource(
    @Param("namespace")
    namespaceParam: string,
    @Query("namespace")
    namespaceQuery: string
  ) {
    return this.ingressService.getIngressResource(namespaceParam || namespaceQuery);
  }
}
