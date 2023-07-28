import { forwardRef, Module } from "@nestjs/common";

import { K8sModule } from "../k8s.module";

import { NamespaceController } from "./namespace.controller";
import { NamespaceService } from "./namespace.service";
import { NamespaceGateway } from "./namespace.gateway";

@Module({
  imports: [forwardRef(() => K8sModule)],
  controllers: [NamespaceController],
  providers: [NamespaceService, NamespaceGateway]
})
export class NamespaceModule {}
