import type {
  V1ConfigMap,
  V1DaemonSet,
  V1Deployment,
  V1Ingress,
  V1Job,
  V1Namespace,
  V1Node,
  V1Pod,
  V1ReplicaSet,
  V1Secret,
  V1Service,
  V1StatefulSet
} from "@kubernetes/client-node";

export enum ResourceTypes {
  NAMESPACE = "namespace",
  NODE = "node",
  INGRESS = "ingress",
  DEPLOYMENT = "deployment",
  STATEFUL_SET = "stateful-set",
  DAEMON_SET = "daemon-set",
  REPLICA_SET = "replica-set",
  SERVICE = "service",
  JOB = "job",
  POD = "pod",
  CONFIG_MAP = "config-map",
  SECRET = "secret"
}

export interface ResourceTypeMap {
  [ResourceTypes.NAMESPACE]: V1Namespace;
  [ResourceTypes.NODE]: V1Node;
  [ResourceTypes.INGRESS]: V1Ingress;
  [ResourceTypes.DEPLOYMENT]: V1Deployment;
  [ResourceTypes.STATEFUL_SET]: V1StatefulSet;
  [ResourceTypes.DAEMON_SET]: V1DaemonSet;
  [ResourceTypes.REPLICA_SET]: V1ReplicaSet;
  [ResourceTypes.SERVICE]: V1Service;
  [ResourceTypes.JOB]: V1Job;
  [ResourceTypes.POD]: V1Pod;
  [ResourceTypes.CONFIG_MAP]: V1ConfigMap;
  [ResourceTypes.SECRET]: V1Secret;
}

export type K8sResource = Exclude<ResourceTypes, ResourceTypes.NAMESPACE>;
