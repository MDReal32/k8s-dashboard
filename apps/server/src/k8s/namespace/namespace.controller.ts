import { Controller, Get, Param } from "@nestjs/common";

import { NamespaceService } from "./namespace.service";

@Controller(["k8s/v1/namespace/:namespace/resource/namespace", "k8s/v1/namespace"])
export class NamespaceController {
  constructor(private readonly namespaceService: NamespaceService) {}

  @Get()
  getNamespace(@Param("namespace") namespace: string) {
    return this.namespaceService.getNamespace(namespace);
  }
}
