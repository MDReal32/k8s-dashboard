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
import { ServiceModule } from "./service/service.module";
import { StatefulSetModule } from "./stateful-set/stateful-set.module";

@Module({
  imports: [
    NodeModule,
    IngressModule,
    NamespaceModule,
    DeploymentModule,
    DaemonSetModule,
    StatefulSetModule,
    ReplicaSetModule,
    CronJobModule,
    ServiceModule,
    JobModule,
    PodModule,
    ConfigMapModule,
    SecretModule
  ]
})
export class K8sModule {}
