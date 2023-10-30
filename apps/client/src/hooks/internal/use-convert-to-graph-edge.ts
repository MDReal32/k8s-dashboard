import { useCallback } from "react";
import { GraphEdge } from "reagraph";

import { ConvertToGraphEdge } from "../../types/convert-to-graph-edge.type";

const edgeMap = new Map<string, GraphEdge>();
const nodeEdgesMap = new Map<string, Set<string>>();

/** @internal */
export const useConvertToGraphEdge = () => {
  return useCallback<ConvertToGraphEdge>((source, target) => {
    const sourceUId = source.metadata?.uid;
    const targetUId = target.metadata?.uid;

    if (!sourceUId || !targetUId) {
      throw new Error(`Node ${sourceUId} or ${targetUId} does not have a uid.`);
    }

    const id = `${sourceUId}/${targetUId}`;

    if (!edgeMap.has(id)) {
      edgeMap.set(
        id,
        Object.create(
          {},
          {
            id: { value: id, writable: false },
            target: { value: targetUId, writable: true, enumerable: true },
            source: { value: sourceUId, writable: true, enumerable: true },
            data: { value: { from: source, to: target }, writable: true, enumerable: true }
          }
        )
      );
      nodeEdgesMap.set(sourceUId, (nodeEdgesMap.get(sourceUId) || new Set()).add(id));
      nodeEdgesMap.set(targetUId, (nodeEdgesMap.get(targetUId) || new Set()).add(id));
    }

    return edgeMap.get(id)!;
  }, []);
};
