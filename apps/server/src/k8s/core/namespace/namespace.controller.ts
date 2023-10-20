import { Controller, Get, Param, Query } from "@nestjs/common";

import { NamespaceService } from "./namespace.service";


@Controller(["k8s/v1/namespace/:namespace/resource/namespace", "k8s/v1/namespace"])
export class NamespaceController {
  constructor(private readonly namespaceService: NamespaceService) {}

  @Get()
  getNamespaceResource(
    @Param("namespace")
    namespaceParam: string,
    @Query("namespace")
    namespaceQuery: string
  ) {
    return this.namespaceService.getNamespaceResource(namespaceParam || namespaceQuery);
  }
}