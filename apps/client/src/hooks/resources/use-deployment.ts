import { useCallback } from "react";

import { ResourceTypes } from "@k8sd/shared";

import { UseResource } from "../../types/use-resource";
import { useConvertToGraphNode } from "./extends/use-convert-to-graph-node";
import { useGetArrayObject } from "./extends/use-get-array-object";

export const useDeployment: UseResource = () => {
  const convertToGraphNode = useConvertToGraphNode();
  const deployments = useGetArrayObject(ResourceTypes.DEPLOYMENT);

  return useCallback(
    ({ addNode }) => {
      deployments.forEach(deployment => {
        addNode(convertToGraphNode(ResourceTypes.DEPLOYMENT, deployment));
      });
    },
    [deployments, convertToGraphNode]
  );
};
