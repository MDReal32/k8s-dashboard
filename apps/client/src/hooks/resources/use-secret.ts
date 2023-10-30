import { useCallback } from "react";

import { ResourceTypes } from "@k8sd/shared";

import { UseResource } from "../../types/use-resource";
import { useConvertToGraphNode } from "./extends/use-convert-to-graph-node";
import { useGetArrayObject } from "./extends/use-get-array-object";

export const useSecret: UseResource = () => {
  const convertToGraphNode = useConvertToGraphNode();
  const secrets = useGetArrayObject(ResourceTypes.SECRET);

  return useCallback(
    ({ addNode }) => {
      secrets.forEach(secret => {
        addNode(convertToGraphNode(ResourceTypes.SECRET, secret));
      });
    },
    [secrets, convertToGraphNode]
  );
};
