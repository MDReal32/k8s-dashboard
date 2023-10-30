import { useMemo, useState } from "react";
import { useDebounce } from "react-use";
import { GraphEdge, GraphNode } from "reagraph";

import { ParsableResourceTypes, ResourceTypeMap, ResourceTypes } from "@k8sd/shared";

import { UseResourceReturnFnOptions } from "../types/use-resource";
import { useConvertToGraphEdge } from "./internal/use-convert-to-graph-edge";
import { useConvertToGraphNode } from "./internal/use-convert-to-graph-node";
import { useConfigMap } from "./resources/use-config-map";
import { useCronJob } from "./resources/use-cron-job";
import { useDaemonSet } from "./resources/use-daemon-set";
import { useDeployment } from "./resources/use-deployment";
import { useEndpoint } from "./resources/use-endpoint";
import { useHorizontalPodAutoscaler } from "./resources/use-horizontal-pod-autoscaler";
import { useIngress } from "./resources/use-ingress";
import { useJob } from "./resources/use-job";
import { useNode } from "./resources/use-node";
import { usePod } from "./resources/use-pod";
import { useReplicaSet } from "./resources/use-replica-set";
import { useSecret } from "./resources/use-secret";
import { useService } from "./resources/use-service";
import { useServiceAccount } from "./resources/use-service-account";
import { useStatefulSet } from "./resources/use-stateful-set";
import { useStorageClass } from "./resources/use-storage-class";

interface NodesAndEdges {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export const useAddNodesAndEdges = () => {
  const [nodesAndEdges, setNodesAndEdges] = useState<NodesAndEdges>({ nodes: [], edges: [] });
  const convertToGraphNode = useConvertToGraphNode();
  const convertToGraphEdge = useConvertToGraphEdge();

  const nodeFn = useNode();
  const ingressFn = useIngress();
  const deploymentFn = useDeployment();
  const statefulSetFn = useStatefulSet();
  const daemonSetFn = useDaemonSet();
  const replicaSetFn = useReplicaSet();
  const cronJobFn = useCronJob();
  const serviceFn = useService();
  const serviceAccountFn = useServiceAccount();
  const horizontalPodAutoscalerFn = useHorizontalPodAutoscaler();
  const jobFn = useJob();
  const podFn = usePod();
  const endpointFn = useEndpoint();
  const configMapFn = useConfigMap();
  const secretFn = useSecret();
  const storageClassFn = useStorageClass();

  const data = useMemo(() => {
    const nodes = new Map<string, GraphNode>();
    const edges = new Map<string, GraphEdge>();

    const queue: (() => void)[] = [];
    const ipAddresses: Record<string, ResourceTypeMap[ParsableResourceTypes]> = {};
    const ipMappings: Record<string, ResourceTypeMap[ParsableResourceTypes]> = {};
    const serviceLabelMap = new Map<string, Set<ResourceTypeMap[ResourceTypes.SERVICE]>>();

    const resourceReturnFnOptions: UseResourceReturnFnOptions = {
      ipAddresses,
      ipMappings,
      serviceLabelMap,
      addNode(resourceType, node) {
        const graphNode = convertToGraphNode(resourceType, node);
        nodes.set(graphNode.id, graphNode);
        return nodeFn => {
          nodeFn(graphNode);
          nodes.set(graphNode.id, graphNode);
        };
      },
      addEdge(source, target) {
        const graphEdge = convertToGraphEdge(source, target);
        edges.set(graphEdge.id, graphEdge);
        return edgeFn => {
          edgeFn(graphEdge);
          edges.set(graphEdge.id, graphEdge);
        };
      },
      addQueue: (fn: () => void) => queue.push(fn)
    };

    nodeFn(resourceReturnFnOptions);
    ingressFn(resourceReturnFnOptions);
    deploymentFn(resourceReturnFnOptions);
    statefulSetFn(resourceReturnFnOptions);
    daemonSetFn(resourceReturnFnOptions);
    replicaSetFn(resourceReturnFnOptions);
    cronJobFn(resourceReturnFnOptions);
    serviceFn(resourceReturnFnOptions);
    serviceAccountFn(resourceReturnFnOptions);
    horizontalPodAutoscalerFn(resourceReturnFnOptions);
    jobFn(resourceReturnFnOptions);
    podFn(resourceReturnFnOptions);
    endpointFn(resourceReturnFnOptions);
    configMapFn(resourceReturnFnOptions);
    secretFn(resourceReturnFnOptions);
    storageClassFn(resourceReturnFnOptions);

    queue.forEach(fn => fn());

    return {
      nodes: Array.from(nodes.values()).map(node => ({ ...node, id: node.id })),
      edges: Array.from(edges.values()).map(edge => ({ ...edge, id: edge.id }))
    };
  }, [
    nodeFn,
    ingressFn,
    deploymentFn,
    statefulSetFn,
    daemonSetFn,
    replicaSetFn,
    cronJobFn,
    serviceFn,
    serviceAccountFn,
    horizontalPodAutoscalerFn,
    jobFn,
    podFn,
    endpointFn,
    configMapFn,
    secretFn,
    storageClassFn,
    convertToGraphNode,
    convertToGraphEdge
  ]);

  useDebounce(() => setNodesAndEdges(data), 300, [data]);

  return nodesAndEdges;
};
