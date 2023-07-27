import { Controller, Get, Param } from "@nestjs/common";

import { NamespaceService } from "./namespace.service";

@Controller("k8s/v1/namespace")
export class NamespaceController {
  constructor(private readonly namespaceService: NamespaceService) {}

  @Get("_")
  getAllNamespaces() {
    return this.namespaceService.getAllNamespaces();
  }

  @Get(":namespace/resource")
  getNamespaceResources(@Param("namespace") namespace: string) {
    return this.namespaceService.getNamespaceResources(namespace);
  }

  @Get(":namespace/resource/pod")
  getNamespacePods(@Param("namespace") namespace: string) {
    return this.namespaceService.getNamespacePods(namespace);
  }

  @Get(":namespace/resource/service")
  getNamespaceServices(@Param("namespace") namespace: string) {
    return this.namespaceService.getNamespaceServices(namespace);
  }
}
