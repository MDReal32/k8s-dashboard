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

  @Post()
  createNamespace(@Body() namespace: CreateNamespaceDto) {
    return this.namespaceService.createNamespace(namespace);
  }

  @Delete(":namespace")
  deleteNamespace(@Param("namespace") namespace: string) {
    return this.namespaceService.deleteNamespace(namespace);
  }
}
