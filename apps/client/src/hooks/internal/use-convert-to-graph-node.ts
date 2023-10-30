import { useCallback } from "react";

import { ConvertToGraphNode, GraphNodeType } from "../../types/convert-to-graph-node.type";
import { useGetColorByCategory } from "../use-get-color-by-category";

const nodeMap = new Map<string, GraphNodeType<any>>();

/** @internal */
export const useConvertToGraphNode = () => {
  const getColor = useGetColorByCategory();

  return useCallback<ConvertToGraphNode>((resourceType, node) => {
    if (!node.metadata?.uid) {
      throw new Error(`Node ${resourceType}:${node.metadata?.name} doesn't have a uid.`);
    }

    const namespace = node.metadata?.namespace || "default";

    if (!nodeMap.has(node.metadata.uid)) {
      nodeMap.set(
        node.metadata.uid,
        Object.create(
          {},
          {
            id: { value: node.metadata.uid, writable: false },
            label: { value: node.metadata.name, writable: true, enumerable: true },
            fill: { value: getColor(resourceType), writable: true, enumerable: true },
            data: {
              value: { cluster: namespace, resourceType, [resourceType]: node },
              writable: true,
              enumerable: true
            }
          }
        )
      );
    }

    return nodeMap.get(node.metadata.uid)!;
  }, []);
};
