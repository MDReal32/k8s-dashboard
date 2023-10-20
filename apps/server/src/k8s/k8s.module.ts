import { Module } from "@nestjs/common";

import { AppsModule } from "./apps/apps.module";
import { AutoScalingModule } from "./auto-scaling/auto-scaling.module";
import { BatchModule } from "./batch/batch.module";
import { CoreModule } from "./core/core.module";
import { RbacAuthorizationModule } from "./rbac-authorization/rbac-authorization.module";
import { StorageModule } from "./storage/storage.module";

@Module({
  imports: [
    AppsModule,
    CoreModule,
    BatchModule,
    AutoScalingModule,
    RbacAuthorizationModule,
    StorageModule
  ]
})
export class K8sModule {}
