import { Module } from "@nestjs/common";

import { NamespaceModule } from "./namespace/namespace.module";

@Module({
  imports: [NamespaceModule]
})
export class K8sModule {}
