import { Module } from "@nestjs/common";

import { DaemonSetModule } from "./daemon-set/daemon-set.module";
import { DeploymentModule } from "./deployment/deployment.module";
import { IngressModule } from "./ingress/ingress.module";
import { NamespaceModule } from "./namespace/namespace.module";
import { NodeModule } from "./node/node.module";
import { PodModule } from "./pod/pod.module";
import { ReplicaSetModule } from "./replica-set/replica-set.module";
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
    ServiceModule,
    PodModule
  ]
})
export class K8sModule {}
