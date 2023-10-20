import { Logger, Module, OnModuleInit } from "@nestjs/common";

import { ClusterRoleBindingModule } from "./cluster-role-binding/cluster-role-binding.module";
import { RbacAuthorizationService } from "./rbac-authorization.service";
import { RoleBindingModule } from "./role-binding/role-binding.module";
import { RoleModule } from "./role/role.module";

@Module({
  imports: [RoleModule, RoleBindingModule, ClusterRoleBindingModule],
  providers: [RbacAuthorizationService, Logger],
  exports: [RbacAuthorizationService]
})
export class RbacAuthorizationModule implements OnModuleInit {
  constructor(private readonly appsService: RbacAuthorizationService) {}

  async onModuleInit() {
    await this.appsService.init();
  }
}
