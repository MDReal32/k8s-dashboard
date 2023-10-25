import { useCallback } from "react";

import { ResourceTypes } from "@k8sd/shared";

import { UseResource } from "../../types/use-resource";
import { useGetArrayObject } from "../use-get-array-object";
import { useConvertToGraphNode } from "./extends/use-convert-to-graph-node";

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
