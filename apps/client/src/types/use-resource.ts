import { GraphEdge, GraphNode } from "reagraph";

import { ResourceTypeMap, ResourceTypes } from "@k8sd/shared";

export interface UseResourceReturnFnOptions {
  ipAddresses: Record<string, ResourceTypeMap[ResourceTypes]>;
  ipMappings: Record<string, ResourceTypeMap[ResourceTypes]>;
  serviceLabelMap: Map<string, Set<ResourceTypeMap[ResourceTypes.SERVICE]>>;
  addNode(node: GraphNode): void;
  addEdge(edge: GraphEdge): void;
  addQueue(fn: () => void): void;
}

type MemoFn = (params: UseResourceReturnFnOptions) => void;
export type UseResource = () => MemoFn;
