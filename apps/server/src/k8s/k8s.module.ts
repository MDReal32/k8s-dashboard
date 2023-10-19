import { Module } from "@nestjs/common";

import { ConfigMapModule } from "./config-map/config-map.module";
import { CronJobModule } from "./cron-job/cron-job.module";
import { DaemonSetModule } from "./daemon-set/daemon-set.module";
import { DeploymentModule } from "./deployment/deployment.module";
import { IngressModule } from "./ingress/ingress.module";
import { JobModule } from "./job/job.module";
import { NamespaceModule } from "./namespace/namespace.module";
import { NodeModule } from "./node/node.module";
import { PodModule } from "./pod/pod.module";
import { ReplicaSetModule } from "./replica-set/replica-set.module";
import { SecretModule } from "./secret/secret.module";
import { ServiceAccountService } from "./service-account/service-account.service";
import { ServiceModule } from "./service/service.module";
import { StatefulSetModule } from "./stateful-set/stateful-set.module";
import { StorageClassModule } from "./storage-class/storage-class.module";

@Module({
  imports: [
    // Root
    NodeModule,
    NamespaceModule,
    DeploymentModule,

    // Groups
    DaemonSetModule,
    StatefulSetModule,
    ReplicaSetModule,
    CronJobModule,

    // Networking
    IngressModule,
    ServiceModule,
    ServiceAccountService,

    // Containers
    JobModule,
    PodModule,

    // Configs
    ConfigMapModule,
    SecretModule,

    // Misc
    StorageClassModule
  ]
})
export class K8sModule {}
