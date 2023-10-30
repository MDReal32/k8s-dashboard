import { Controller, Get } from "@nestjs/common";

import { ResourceTypes } from "@k8sd/shared";

import { Namespace } from "../../../decorators/namespace.decorator";
import { EndpointService } from "./endpoint.service";


@Controller([
  `k8s/v1/${ResourceTypes.NAMESPACE}/:namespace/resource/${ResourceTypes.ENDPOINT}`,
  `k8s/v1/${ResourceTypes.ENDPOINT}`
])
export class EndpointController {
  constructor(private readonly endpointService: EndpointService) {}

  @Get()
  getEndpointResource(@Namespace() namespace: string) {
    return this.endpointService.getEndpointResource(namespace);
  }
}