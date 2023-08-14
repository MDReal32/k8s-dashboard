import { Module } from "@nestjs/common";

import { PodModule } from "./pod/pod.module";
import { ReplicaSetModule } from "./replica-set/replica-set.module";
import { DeploymentModule } from "./deployment/deployment.module";
import { StatefulSetModule } from "./stateful-set/stateful-set.module";
import { DaemonSetModule } from "./daemon-set/daemon-set.module";
import { JobModule } from "./job/job.module";
import { CronJobModule } from "./cron-job/cron-job.module";
import { NamespaceModule } from "./namespace/namespace.module";
import { ServiceModule } from "./service/service.module";
import { IngressModule } from "./ingress/ingress.module";
import { ConfigMapModule } from "./config-map/config-map.module";
import { SecretModule } from "./secret/secret.module";
import { PersistentVolumeModule } from "./persistent-volume/persistent-volume.module";
import { PersistentVolumeClaimModule } from "./persistent-volume-claim/persistent-volume-claim.module";
import { StorageClassModule } from "./storage-class/storage-class.module";
import { NodeModule } from "./node/node.module";
import { ServiceAccountModule } from "./service-account/service-account.module";
import { RoleModule } from "./role/role.module";
import { ClusterRoleModule } from "./cluster-role/cluster-role.module";
import { RoleBindingModule } from "./role-binding/role-binding.module";
import { ClusterRoleBindingModule } from "./cluster-role-binding/cluster-role-binding.module";
import { HorizontalPodAutoscalerModule } from "./horizontal-pod-autoscaler/horizontal-pod-autoscaler.module";
import { VerticalPodAutoscalerModule } from "./vertical-pod-autoscaler/vertical-pod-autoscaler.module";
import { NetworkPolicyModule } from "./network-policy/network-policy.module";
import { PodSecurityPolicyModule } from "./pod-security-policy/pod-security-policy.module";
import { ServiceMeshModule } from "./service-mesh/service-mesh.module";
import { CustomResourceDefinitionModule } from "./custom-resource-definition/custom-resource-definition.module";
import { OperatorModule } from "./operator/operator.module";
import { AdmissionControllerModule } from "./admission-controller/admission-controller.module";

@Module({
  imports: [
    PodModule,
    ReplicaSetModule,
    DeploymentModule,
    StatefulSetModule,
    DaemonSetModule,
    JobModule,
    CronJobModule,
    NamespaceModule,
    ServiceModule,
    IngressModule,
    ConfigMapModule,
    SecretModule,
    PersistentVolumeModule,
    PersistentVolumeClaimModule,
    StorageClassModule,
    NodeModule,
    ServiceAccountModule,
    RoleModule,
    ClusterRoleModule,
    RoleBindingModule,
    ClusterRoleBindingModule,
    HorizontalPodAutoscalerModule,
    VerticalPodAutoscalerModule,
    NetworkPolicyModule,
    PodSecurityPolicyModule,
    ServiceMeshModule,
    CustomResourceDefinitionModule,
    OperatorModule,
    AdmissionControllerModule
  ]
})
export class K8sModule {}
