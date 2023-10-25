import { useCallback } from "react";
import { GraphEdge } from "reagraph";

import { ResourceTypeMap, ResourceTypes } from "@k8sd/shared";

const edgeMap = new Map<string, GraphEdge>();
const nodeEdgesMap = new Map<string, Set<string>>();

export const useConvertToGraphEdge = () => {
  return useCallback(
    (source: ResourceTypeMap[ResourceTypes], target: ResourceTypeMap[ResourceTypes]): GraphEdge => {
      const sourceUId = source.metadata?.uid;
      const targetUId = target.metadata?.uid;

      if (!sourceUId || !targetUId) {
        throw new Error(`Node ${sourceUId} or ${targetUId} does not have a uid.`);
      }

      const id = `${sourceUId}/${targetUId}`;

      if (!edgeMap.has(id)) {
        edgeMap.set(id, {
          id,
          target: targetUId,
          source: sourceUId,
          data: { from: source, to: target }
        });
        nodeEdgesMap.set(sourceUId, (nodeEdgesMap.get(sourceUId) || new Set()).add(id));
        nodeEdgesMap.set(targetUId, (nodeEdgesMap.get(targetUId) || new Set()).add(id));
      }

      return edgeMap.get(id)!;
    },
    []
  );
};
