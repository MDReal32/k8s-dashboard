import { Controller, Get } from "@nestjs/common";

import { ResourceTypes } from "@k8sd/shared";

import { Namespace } from "../../../decorators/namespace.decorator";
import { SecretService } from "./secret.service";


@Controller([
  `k8s/v1/${ResourceTypes.NAMESPACE}/:namespace/resource/${ResourceTypes.SECRET}`,
  `k8s/v1/${ResourceTypes.SECRET}`
])
export class SecretController {
  constructor(private readonly secretService: SecretService) {}

  @Get()
  getSecretResource(@Namespace() namespace: string) {
    return this.secretService.getSecretResource(namespace);
  }
}