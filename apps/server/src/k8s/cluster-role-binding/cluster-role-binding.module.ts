import { Module } from "@nestjs/common";
import { ClusterRoleBindingController } from "./cluster-role-binding.controller";
import { ClusterRoleBindingGateway } from "./cluster-role-binding.gateway";
import { ClusterRoleBindingService } from "./cluster-role-binding.service";

@Module({
  controllers: [ClusterRoleBindingController],
  providers: [ClusterRoleBindingGateway, ClusterRoleBindingService]
})
export class ClusterRoleBindingModule {}
