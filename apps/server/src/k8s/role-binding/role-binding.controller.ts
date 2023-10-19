import { Controller, Get, Param, Query } from "@nestjs/common";

import { RoleBindingService } from "./role-binding.service";

@Controller(["k8s/v1/namespace/:namespace/resource/role-binding", "k8s/v1/role-binding"])
export class RoleBindingController {
  constructor(private readonly roleBindingService: RoleBindingService) {}

  @Get()
  getRoleBindingResource(
    @Param("namespace")
    namespaceParam: string,
    @Query("namespace")
    namespaceQuery: string
  ) {
    return this.roleBindingService.getRoleBindingResource(namespaceParam || namespaceQuery);
  }
}
