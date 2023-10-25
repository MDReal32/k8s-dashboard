import { useMemo, useState } from "react";
import { useDebounce } from "react-use";
import { GraphEdge, GraphNode } from "reagraph";

import { ResourceTypeMap, ResourceTypes } from "@k8sd/shared";

import { UseResourceReturnOptions } from "../types/use-resource";
import { useConfigMap } from "./resources/use-config-map";
import { useDaemonSet } from "./resources/use-daemon-set";
import { useDeployment } from "./resources/use-deployment";
import { useIngress } from "./resources/use-ingress";
import { useJob } from "./resources/use-job";
import { useNode } from "./resources/use-node";
import { usePod } from "./resources/use-pod";
import { useReplicaSet } from "./resources/use-replica-set";
import { useSecret } from "./resources/use-secret";
import { useService } from "./resources/use-service";
import { useStatefulSet } from "./resources/use-stateful-set";

export const useAddNodesAndEdges = () => {
  const [nodesAndEdges, setNodesAndEdges] = useState<{ nodes: GraphNode[]; edges: GraphEdge[] }>({
    nodes: [],
    edges: []
  });

  const nodeFn = useNode();
  const ingressFn = useIngress();
  const deploymentFn = useDeployment();
  const statefulSetFn = useStatefulSet();
  const daemonSetFn = useDaemonSet();
  const replicaSetFn = useReplicaSet();
  const serviceFn = useService();
  const jobFn = useJob();
  const podFn = usePod();
  const configMapFn = useConfigMap();
  const secretFn = useSecret();

  const data = useMemo(() => {
    const nodes = new Map<string, GraphNode>();
    const edges = new Map<string, GraphEdge>();

    const queue: (() => void)[] = [];
    const ipAddresses: Record<string, ResourceTypeMap[ResourceTypes]> = {};
    const ipMappings: Record<string, ResourceTypeMap[ResourceTypes]> = {};
    const serviceLabelMap = new Map<string, Set<ResourceTypeMap[ResourceTypes.SERVICE]>>();

    const returnOptions: UseResourceReturnOptions = {
      ipAddresses,
      ipMappings,
      serviceLabelMap,
      addNode: (node: GraphNode) => nodes.set(node.id, node),
      addEdge: (edge: GraphEdge) => edges.set(edge.id, edge),
      addQueue: (fn: () => void) => queue.push(fn)
    };

    nodeFn(returnOptions);
    ingressFn(returnOptions);
    deploymentFn(returnOptions);
    statefulSetFn(returnOptions);
    daemonSetFn(returnOptions);
    replicaSetFn(returnOptions);
    serviceFn(returnOptions);
    jobFn(returnOptions);
    podFn(returnOptions);
    configMapFn(returnOptions);
    secretFn(returnOptions);

    queue.forEach(fn => fn());

    return { nodes: Array.from(nodes.values()), edges: Array.from(edges.values()) };
  }, [
    nodeFn,
    ingressFn,
    deploymentFn,
    statefulSetFn,
    daemonSetFn,
    replicaSetFn,
    serviceFn,
    jobFn,
    podFn,
    configMapFn,
    secretFn
  ]);

  useDebounce(() => setNodesAndEdges(data), 300, [data]);

  return nodesAndEdges;
};
