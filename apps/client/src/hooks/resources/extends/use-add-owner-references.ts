import { useCallback } from "react";

import { ResourceTypeMap, ResourceTypes } from "@k8sd/shared";

import { UseResourceReturnOptions } from "../../../types/use-resource";
import { convertKindToResourceType } from "../../../utils/convert-kind-to-resource-type";
import { useConvertToGraphEdge } from "./use-convert-to-graph-edge";
import { useGetAllResources } from "./use-get-all-resources";

interface AddOwnerReferences extends Pick<UseResourceReturnOptions, "addEdge"> {}

export const useAddOwnerReferences = () => {
  const convertToGraphEdge = useConvertToGraphEdge();
  const allObjects = useGetAllResources();

  return useCallback(
    <TResourceType extends ResourceTypes>(
      node: ResourceTypeMap[TResourceType],
      { addEdge }: AddOwnerReferences
    ) => {
      const owners = node.metadata?.ownerReferences;
      if (owners) {
        for (const owner of owners) {
          const object = allObjects[convertKindToResourceType(owner.kind)];
          const idx = object?.dataNameIndexes[owner.name];
          const item = object?.[idx];
          if (item) {
            addEdge(convertToGraphEdge(item, node));
          }
        }
      }
      return !!owners;
    },
    [convertToGraphEdge, allObjects]
  );
};
