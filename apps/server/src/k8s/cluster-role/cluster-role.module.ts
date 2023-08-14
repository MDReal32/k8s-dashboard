import { Module } from "@nestjs/common";
import { ClusterRoleController } from "./cluster-role.controller";
import { ClusterRoleGateway } from "./cluster-role.gateway";
import { ClusterRoleService } from "./cluster-role.service";

@Module({
  controllers: [ClusterRoleController],
  providers: [ClusterRoleGateway, ClusterRoleService]
})
export class ClusterRoleModule {}
