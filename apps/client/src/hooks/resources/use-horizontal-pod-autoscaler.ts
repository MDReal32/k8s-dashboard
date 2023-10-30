import { useCallback } from "react";

import { ResourceTypes } from "@k8sd/shared";

import { UseResource } from "../../types/use-resource";
import { useConvertToGraphNode } from "./extends/use-convert-to-graph-node";
import { useGetArrayObject } from "./extends/use-get-array-object";

export const useHorizontalPodAutoscaler: UseResource = () => {
  const convertToGraphNode = useConvertToGraphNode();
  const horizontalPodAutoscalers = useGetArrayObject(ResourceTypes.HORIZONTAL_POD_AUTOSCALER);

  return useCallback(
    ({ addNode }) => {
      horizontalPodAutoscalers.forEach(horizontalPodAutoscaler => {
        addNode(
          convertToGraphNode(ResourceTypes.HORIZONTAL_POD_AUTOSCALER, horizontalPodAutoscaler)
        );
      });
    },
    [horizontalPodAutoscalers, convertToGraphNode]
  );
};
