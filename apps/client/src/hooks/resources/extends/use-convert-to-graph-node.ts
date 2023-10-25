import { useCallback } from "react";
import { GraphElementBaseAttributes, GraphNode } from "reagraph";

import { ResourceTypeMap, ResourceTypes } from "@k8sd/shared";

import { useGetColorByCategory } from "../../use-get-color-by-category";

type Clustered<TResource> = { cluster: string; resourceType: ResourceTypes } & TResource;
type GraphNodeType<T> = Omit<GraphNode, "data"> & GraphElementBaseAttributes<Clustered<T>>;

const nodeMap = new Map<string, GraphNodeType<any>>();
export const useConvertToGraphNode = () => {
  const getColor = useGetColorByCategory();

  return useCallback(
    <TResourceType extends ResourceTypes>(
      resourceType: TResourceType,
      node: ResourceTypeMap[TResourceType]
    ): GraphNodeType<ResourceTypeMap[TResourceType]> => {
      if (!node.metadata?.uid) {
        throw new Error(`Node ${resourceType}:${node.metadata?.name} doesn't have a uid.`);
      }

      const namespace = node.metadata?.namespace || "default";

      if (!nodeMap.has(node.metadata.uid)) {
        nodeMap.set(node.metadata.uid, {
          id: node.metadata.uid,
          label: node.metadata.name,
          fill: getColor(resourceType),
          data: { cluster: namespace, resourceType, [resourceType]: node }
        });
      }

      return nodeMap.get(node.metadata.uid)!;
    },
    []
  );
};
