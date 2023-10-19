import { Module } from "@nestjs/common";

import { ClusterRoleBindingModule } from "./cluster-role-binding/cluster-role-binding.module";
import { RoleBindingModule } from "./role-binding/role-binding.module";
import { RoleModule } from "./role/role.module";

@Module({
  imports: [RoleModule, RoleBindingModule, ClusterRoleBindingModule]
})
export class RbacAuthorizationModule {}
