import { ParsableResourceTypes, ResourceTypeMap, ResourceTypes } from "@k8sd/shared";

import { ConvertToGraphEdge } from "./convert-to-graph-edge.type";
import { ConvertToGraphNode } from "./convert-to-graph-node.type";

export interface UseResourceReturnFnOptions {
  ipAddresses: Record<string, ResourceTypeMap[ParsableResourceTypes]>;
  ipMappings: Record<string, ResourceTypeMap[ParsableResourceTypes]>;
  serviceLabelMap: Map<string, Set<ResourceTypeMap[ResourceTypes.SERVICE]>>;
  addNode(
    ...params: Parameters<ConvertToGraphNode>
  ): (nodeFn: (node: ReturnType<ConvertToGraphNode>) => void) => void;
  addEdge(
    ...params: Parameters<ConvertToGraphEdge>
  ): (edgeFn: (edge: ReturnType<ConvertToGraphEdge>) => void) => void;
  addQueue(fn: () => void): void;
}

type MemoFn = (params: UseResourceReturnFnOptions) => void;
export type UseResource = () => MemoFn;
