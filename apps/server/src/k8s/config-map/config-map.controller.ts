import { Controller, Get, Param, Query } from "@nestjs/common";

import { ConfigMapService } from "./config-map.service";

@Controller(["k8s/v1/namespace/:namespace/resource/config-map", "k8s/v1/config-map"])
export class ConfigMapController {
  constructor(private readonly configMapService: ConfigMapService) {}

  @Get()
  getDeploymentResource(
    @Param("namespace")
    namespaceParam: string,
    @Query("namespace")
    namespaceQuery: string
  ) {
    return this.configMapService.getConfigMapResource(namespaceParam || namespaceQuery);
  }
}
