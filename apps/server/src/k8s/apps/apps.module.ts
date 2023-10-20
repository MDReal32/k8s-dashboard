import { Logger, Module, OnModuleInit } from "@nestjs/common";

import { AppsService } from "./apps.service";
import { DaemonSetModule } from "./daemon-set/daemon-set.module";
import { DeploymentModule } from "./deployment/deployment.module";
import { ReplicaSetModule } from "./replica-set/replica-set.module";
import { StatefulSetModule } from "./stateful-set/stateful-set.module";

@Module({
  imports: [DeploymentModule, DaemonSetModule, StatefulSetModule, ReplicaSetModule],
  providers: [AppsService, Logger],
  exports: [AppsService]
})
export class AppsModule implements OnModuleInit {
  constructor(private readonly appsService: AppsService) {}

  async onModuleInit() {
    await this.appsService.init();
  }
}
