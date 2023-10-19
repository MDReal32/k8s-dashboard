import { Module } from "@nestjs/common";

import { RoleBindingController } from "./role-binding.controller";
import { RoleBindingGateway } from "./role-binding.gateway";
import { RoleBindingService } from "./role-binding.service";

@Module({
  controllers: [RoleBindingController],
  providers: [RoleBindingGateway, RoleBindingService],
  exports: [RoleBindingService]
})
export class RoleBindingModule {}
