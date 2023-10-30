import { Controller, Get } from "@nestjs/common";

import { ResourceTypes } from "@k8sd/shared";

import { Namespace } from "../../../decorators/namespace.decorator";
import { ServiceAccountService } from "./service-account.service";


@Controller([
  `k8s/v1/${ResourceTypes.NAMESPACE}/:namespace/resource/${ResourceTypes.SERVICE_ACCOUNT}`,
  `k8s/v1/${ResourceTypes.SERVICE_ACCOUNT}`
])
export class ServiceAccountController {
  constructor(private readonly serviceAccountService: ServiceAccountService) {}

  @Get()
  getServiceAccountResource(@Namespace() namespace: string) {
    return this.serviceAccountService.getServiceAccountResource(namespace);
  }
}