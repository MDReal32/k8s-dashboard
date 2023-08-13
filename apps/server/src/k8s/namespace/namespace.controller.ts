import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";

import { NamespaceService } from "./namespace.service";
import { CreateNamespaceDto } from "./dto/create-namespace.dto";

@Controller("k8s/v1/namespace")
export class NamespaceController {
  constructor(private readonly namespaceService: NamespaceService) {}

  @Get("_")
  getAllNamespaces() {
    return this.namespaceService.getAllNamespaces();
  }

  @Get(":namespace")
  getNamespace(@Param("namespace") namespace: string) {
    return this.namespaceService.getNamespace(namespace);
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

  @Post()
  createNamespace(@Body() namespace: CreateNamespaceDto) {
    return this.namespaceService.createNamespace(namespace);
  }

  @Delete(":namespace")
  deleteNamespace(@Param("namespace") namespace: string) {
    return this.namespaceService.deleteNamespace(namespace);
  }
}
