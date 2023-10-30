import { useCallback } from "react";

import { ResourceTypes } from "@k8sd/shared";

import { UseResource } from "../../types/use-resource";
import { useConvertToGraphNode } from "./extends/use-convert-to-graph-node";
import { useGetArrayObject } from "./extends/use-get-array-object";

export const useStatefulSet: UseResource = () => {
  const convertToGraphNode = useConvertToGraphNode();
  const statefulSets = useGetArrayObject(ResourceTypes.STATEFUL_SET);

  return useCallback(
    ({ addNode }) => {
      statefulSets.forEach(statefulSet => {
        addNode(convertToGraphNode(ResourceTypes.STATEFUL_SET, statefulSet));
      });
    },
    [statefulSets, convertToGraphNode]
  );
};
