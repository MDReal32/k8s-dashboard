import { Controller, Get, Param, Query } from "@nestjs/common";

import { RoleService } from "./role.service";

@Controller(["k8s/v1/namespace/:namespace/resource/role", "k8s/v1/role"])
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  getRoleResource(
    @Param("namespace")
    namespaceParam: string,
    @Query("namespace")
    namespaceQuery: string
  ) {
    return this.roleService.getRoleResource(namespaceParam || namespaceQuery);
  }
}
