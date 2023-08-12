import { Module } from "@nestjs/common";
import { PrismaModule } from "nestjs-prisma";

import { K8sModule } from "./k8s/k8s.module";
import { ProjectModule } from "./project/project.module";
import { LogModule } from "./log/log.module";

@Module({
  imports: [K8sModule, ProjectModule, LogModule, PrismaModule.forRoot()]
})
export class AppModule {}
