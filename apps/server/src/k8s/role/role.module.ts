import { Module } from "@nestjs/common";
import { RoleController } from "./role.controller";
import { RoleGateway } from "./role.gateway";
import { RoleService } from "./role.service";

@Module({
  controllers: [RoleController],
  providers: [RoleGateway, RoleService]
})
export class RoleModule {}
