import { Controller, Get } from "@nestjs/common";

import { ResourceTypes } from "@k8sd/shared";

import { Namespace } from "../../../decorators/namespace.decorator";
import { ConfigMapService } from "./config-map.service";


@Controller([
  `k8s/v1/${ResourceTypes.NAMESPACE}/:namespace/resource/${ResourceTypes.CONFIG_MAP}`,
  `k8s/v1/${ResourceTypes.CONFIG_MAP}`
])
export class ConfigMapController {
  constructor(private readonly configMapService: ConfigMapService) {}

  @Get()
  getConfigMapResource(@Namespace() namespace: string) {
    return this.configMapService.getConfigMapResource(namespace);
  }
}