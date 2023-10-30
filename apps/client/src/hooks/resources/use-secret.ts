import { useCallback } from "react";

import { ResourceTypes } from "@k8sd/shared";

import { UseResource } from "../../types/use-resource";
import { useGetArrayObject } from "./extends/use-get-array-object";

export const useSecret: UseResource = () => {
  const secrets = useGetArrayObject(ResourceTypes.SECRET);

  return useCallback(
    ({ addNode }) => {
      secrets.forEach(secret => {
        addNode(ResourceTypes.SECRET, secret);
      });
    },
    [secrets]
  );
};
