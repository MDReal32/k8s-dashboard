import { Module } from "@nestjs/common";

import { K8sModule } from "./k8s/k8s.module";
import { GitModule } from "./git/git.module";
import { ProjectModule } from "./project/project.module";
import { LogModule } from './log/log.module';

@Module({
  imports: [K8sModule, GitModule, ProjectModule, LogModule]
})
export class AppModule {}
