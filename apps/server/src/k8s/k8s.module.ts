import { Module } from "@nestjs/common";

import { CoreModule } from "./core/core.module";
import { CronJobModule } from "./cron-job/cron-job.module";
import { DaemonSetModule } from "./daemon-set/daemon-set.module";
import { DeploymentModule } from "./deployment/deployment.module";
import { HorizontalPodAutoscalerModule } from "./horizontal-pod-autoscaler/horizontal-pod-autoscaler.module";
import { IngressModule } from "./ingress/ingress.module";
import { JobModule } from "./job/job.module";
import { RbacAuthorizationModule } from "./rbac-authorization/rbac-authorization.module";
import { ReplicaSetModule } from "./replica-set/replica-set.module";
import { StatefulSetModule } from "./stateful-set/stateful-set.module";
import { StorageClassModule } from "./storage-class/storage-class.module";

@Module({
  imports: [
    CoreModule,

    // Root
    DeploymentModule,

    // Groups
    DaemonSetModule,
    StatefulSetModule,
    ReplicaSetModule,
    CronJobModule,

    // Networking
    IngressModule,

    // Pod Management
    HorizontalPodAutoscalerModule,

    // Containers
    JobModule,

    RbacAuthorizationModule,

    // Misc
    StorageClassModule
  ]
})
export class K8sModule {}
