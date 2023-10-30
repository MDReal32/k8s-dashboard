import type {
  V1ClusterRoleBinding,
  V1ConfigMap,
  V1CronJob,
  V1DaemonSet,
  V1Deployment,
  V1Endpoints,
  V1HorizontalPodAutoscaler,
  V1Ingress,
  V1Job,
  V1Namespace,
  V1Node,
  V1Pod,
  V1ReplicaSet,
  V1Role,
  V1RoleBinding,
  V1Secret,
  V1Service,
  V1ServiceAccount,
  V1StatefulSet,
  V1StorageClass,
  V1Volume
} from "@kubernetes/client-node";

export enum ResourceTypes {
  NAMESPACE = "namespace",
  NODE = "node",
  INGRESS = "ingress",
  DEPLOYMENT = "deployment",
  STATEFUL_SET = "stateful-set",
  DAEMON_SET = "daemon-set",
  REPLICA_SET = "replica-set",
  CRON_JOB = "cron-job",
  SERVICE = "service",
  SERVICE_ACCOUNT = "service-account",
  HORIZONTAL_POD_AUTOSCALER = "horizontal-pod-autoscaler",
  JOB = "job",
  POD = "pod",
  ENDPOINT = "endpoint",
  CONFIG_MAP = "config-map",
  SECRET = "secret",
  STORAGE_CLASS = "storage-class",
  CLUSTER_ROLE_BINDING = "cluster-role-binding",
  ROLE_BINDING = "role-binding",
  ROLE = "role",
  VOLUME = "volume"
}

export interface ResourceTypeMap {
  [ResourceTypes.NAMESPACE]: V1Namespace;
  [ResourceTypes.NODE]: V1Node;
  [ResourceTypes.INGRESS]: V1Ingress;
  [ResourceTypes.DEPLOYMENT]: V1Deployment;
  [ResourceTypes.STATEFUL_SET]: V1StatefulSet;
  [ResourceTypes.DAEMON_SET]: V1DaemonSet;
  [ResourceTypes.REPLICA_SET]: V1ReplicaSet;
  [ResourceTypes.CRON_JOB]: V1CronJob;
  [ResourceTypes.SERVICE]: V1Service;
  [ResourceTypes.SERVICE_ACCOUNT]: V1ServiceAccount;
  [ResourceTypes.HORIZONTAL_POD_AUTOSCALER]: V1HorizontalPodAutoscaler;
  [ResourceTypes.JOB]: V1Job;
  [ResourceTypes.POD]: V1Pod;
  [ResourceTypes.ENDPOINT]: V1Endpoints;
  [ResourceTypes.CONFIG_MAP]: V1ConfigMap;
  [ResourceTypes.SECRET]: V1Secret;
  [ResourceTypes.STORAGE_CLASS]: V1StorageClass;
  [ResourceTypes.CLUSTER_ROLE_BINDING]: V1ClusterRoleBinding;
  [ResourceTypes.ROLE_BINDING]: V1RoleBinding;
  [ResourceTypes.ROLE]: V1Role;
  [ResourceTypes.VOLUME]: V1Volume;
}

export type ParsableResourceTypes = Exclude<ResourceTypes, ResourceTypes.VOLUME>;
