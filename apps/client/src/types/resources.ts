import type {
  V1Deployment,
  V1Namespace,
  V1Pod,
  V1Service,
  V1StatefulSet
} from "@kubernetes/client-node";
import {
  V1ConfigMap,
  V1DaemonSet,
  V1Ingress,
  V1Job,
  V1Node,
  V1ReplicaSet
} from "@kubernetes/client-node";

export enum ResourceTypes {
  NODE = "node",
  INGRESS = "ingress",
  NAMESPACE = "namespace",
  DEPLOYMENT = "deployment",
  STATEFUL_SET = "stateful-set",
  DAEMON_SET = "daemon-set",
  REPLICA_SET = "replica-set",
  SERVICE = "service",
  JOB = "job",
  POD = "pod",
  CONFIG_MAP = "config-map"
}

export interface ResourceTypeMap {
  [ResourceTypes.NODE]: V1Node;
  [ResourceTypes.INGRESS]: V1Ingress;
  [ResourceTypes.NAMESPACE]: V1Namespace;
  [ResourceTypes.DEPLOYMENT]: V1Deployment;
  [ResourceTypes.STATEFUL_SET]: V1StatefulSet;
  [ResourceTypes.DAEMON_SET]: V1DaemonSet;
  [ResourceTypes.REPLICA_SET]: V1ReplicaSet;
  [ResourceTypes.SERVICE]: V1Service;
  [ResourceTypes.JOB]: V1Job;
  [ResourceTypes.POD]: V1Pod;
  [ResourceTypes.CONFIG_MAP]: V1ConfigMap;
}
