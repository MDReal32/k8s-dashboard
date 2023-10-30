import { Controller, Get } from "@nestjs/common";

import { ResourceTypes } from "@k8sd/shared";

import { Namespace } from "../../../decorators/namespace.decorator";
import { RoleBindingService } from "./role-binding.service";

@Controller([
  `k8s/v1/${ResourceTypes.NAMESPACE}/:namespace/resource/${ResourceTypes.ROLE_BINDING}`,
  `k8s/v1/${ResourceTypes.ROLE_BINDING}`
])
export class RoleBindingController {
  constructor(private readonly roleBindingService: RoleBindingService) {}

  @Get()
  getRoleBindingResource(@Namespace() namespace: string) {
    return this.roleBindingService.getRoleBindingResource(namespace);
  }
}
