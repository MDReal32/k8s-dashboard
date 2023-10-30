import { useCallback } from "react";

import { ResourceTypes } from "@k8sd/shared";

import { UseResource } from "../../types/use-resource";
import { useGetArrayObject } from "./extends/use-get-array-object";

export const useHorizontalPodAutoscaler: UseResource = () => {
  const horizontalPodAutoscalers = useGetArrayObject(ResourceTypes.HORIZONTAL_POD_AUTOSCALER);

  return useCallback(
    ({ addNode }) => {
      horizontalPodAutoscalers.forEach(horizontalPodAutoscaler => {
        addNode(ResourceTypes.HORIZONTAL_POD_AUTOSCALER, horizontalPodAutoscaler);
      });
    },
    [horizontalPodAutoscalers]
  );
};
