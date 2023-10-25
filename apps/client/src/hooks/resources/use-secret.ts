import { useCallback } from "react";

import { ResourceTypes } from "@k8sd/shared";

import { UseResource } from "../../types/use-resource";
import { useGetArrayObject } from "../use-get-array-object";
import { useConvertToGraphNode } from "./extends/use-convert-to-graph-node";

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
