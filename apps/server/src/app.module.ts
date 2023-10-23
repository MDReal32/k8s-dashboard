import { Module } from "@nestjs/common";

import { K8sModule } from "./k8s/k8s.module";
import { LogModule } from "./log/log.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ProjectModule } from "./project/project.module";

@Module({
  imports: [K8sModule, ProjectModule, LogModule, PrismaModule]
})
export class AppModule {}
