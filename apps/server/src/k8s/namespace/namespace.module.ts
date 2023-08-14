import { Module } from "@nestjs/common";

import { NamespaceController } from "./namespace.controller";
import { NamespaceService } from "./namespace.service";
import { NamespaceGateway } from "./namespace.gateway";

@Module({
  controllers: [NamespaceController],
  providers: [NamespaceService, NamespaceGateway]
})
export class NamespaceModule {}
