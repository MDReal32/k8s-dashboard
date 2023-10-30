import { Controller, Get, Param, Query } from "@nestjs/common";

import { ResourceTypes } from "@k8sd/shared";

import { Namespace } from "../../../decorators/namespace.decorator";
import { RoleService } from "./role.service";

@Controller([
  `k8s/v1/${ResourceTypes.NAMESPACE}/:namespace/resource/${ResourceTypes.ROLE}`,
  `k8s/v1/${ResourceTypes.ROLE}`
])
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  getRoleResource(@Namespace() namespace: string) {
    return this.roleService.getRoleResource(namespace);
  }
}
