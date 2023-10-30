import { useCallback } from "react";

import { ParsableResourceTypes, ResourceTypeMap } from "@k8sd/shared";

import { UseResourceReturnFnOptions } from "../../../types/use-resource";
import { convertKindToResourceType } from "../../../utils/convert-kind-to-resource-type";
import { useGetAllResources } from "./use-get-all-resources";

interface AddOwnerReferences extends Pick<UseResourceReturnFnOptions, "addEdge"> {}

export const useAddOwnerReferences = () => {
  const allObjects = useGetAllResources();

  return useCallback(
    <TResourceType extends ParsableResourceTypes>(
      node: ResourceTypeMap[TResourceType],
      { addEdge }: AddOwnerReferences
    ) => {
      const owners = node.metadata?.ownerReferences;
      if (owners) {
        for (const owner of owners) {
          const objects = allObjects[convertKindToResourceType<TResourceType>(owner.kind)];
          const idx = objects?.dataNameIndexes[owner.name];
          const object = objects?.[idx];
          if (object) {
            addEdge(object, node);
          }
        }
      }
      return !!owners;
    },
    [allObjects]
  );
};
