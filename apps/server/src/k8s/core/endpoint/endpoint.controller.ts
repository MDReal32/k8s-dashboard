import { Controller, Get, Param, Query } from "@nestjs/common";

import { EndpointService } from "./endpoint.service";

@Controller(["k8s/v1/namespace/:namespace/resource/endpoint", "k8s/v1/endpoint"])
export class EndpointController {
  constructor(private readonly endpointService: EndpointService) {}

  @Get()
  getEndpointResource(
    @Param("namespace")
    namespaceParam: string,
    @Query("namespace")
    namespaceQuery: string
  ) {
    return this.endpointService.getEndpointResource(namespaceParam || namespaceQuery);
  }
}
