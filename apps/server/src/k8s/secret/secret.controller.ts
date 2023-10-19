import { Controller, Get, Param, Query } from "@nestjs/common";

import { SecretService } from "./secret.service";

@Controller(["k8s/v1/namespace/:namespace/resource/secret", "k8s/v1/secret"])
export class SecretController {
  constructor(private readonly secretService: SecretService) {}

  @Get()
  getSecretResource(
    @Param("namespace")
    namespaceParam: string,
    @Query("namespace")
    namespaceQuery: string
  ) {
    return this.secretService.getSecretResource(namespaceParam || namespaceQuery);
  }
}
