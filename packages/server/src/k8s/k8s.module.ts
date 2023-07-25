import { Module } from "@nestjs/common";

import { K8sService } from "./k8s.service";
import { NamespaceModule } from "./namespace/namespace.module";

@Module({
  imports: [NamespaceModule],
  providers: [K8sService],
  exports: [K8sService]
})
export class K8sModule {}
