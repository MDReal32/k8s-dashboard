import { Controller, Get, Param, Query } from "@nestjs/common";

import { ResourceTypes } from "@k8sd/shared";

import { Namespace } from "../../../decorators/namespace.decorator";
import { IngressService } from "./ingress.service";

@Controller([
  `k8s/v1/${ResourceTypes.NAMESPACE}/:namespace/resource/${ResourceTypes.INGRESS}`,
  `k8s/v1/${ResourceTypes.INGRESS}`
])
export class IngressController {
  constructor(private readonly ingressService: IngressService) {}

  @Get()
  getIngressResource(@Namespace() namespace: string) {
    return this.ingressService.getIngressResource(namespace);
  }
}
