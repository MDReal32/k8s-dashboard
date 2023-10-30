import { Controller, Get, Param, Query } from "@nestjs/common";

import { ResourceTypes } from "@k8sd/shared";

import { Namespace } from "../../../decorators/namespace.decorator";
import { NamespaceService } from "./namespace.service";

@Controller([
  `k8s/v1/${ResourceTypes.NAMESPACE}/:namespace/resource/${ResourceTypes.NAMESPACE}`,
  `k8s/v1/${ResourceTypes.NAMESPACE}`
])
export class NamespaceController {
  constructor(private readonly namespaceService: NamespaceService) {}

  @Get()
  getNamespaceResource(@Namespace() namespace: string) {
    return this.namespaceService.getNamespaceResource(namespace);
  }
}
