import { Module } from "@nestjs/common";

import { NamespaceController } from "./namespace.controller";
import { NamespaceGateway } from "./namespace.gateway";
import { NamespaceService } from "./namespace.service";

@Module({
  controllers: [NamespaceController],
  providers: [NamespaceGateway, NamespaceService],
  exports: [NamespaceService]
})
export class NamespaceModule {}
