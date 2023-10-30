import { useCallback } from "react";

import { ResourceTypes } from "@k8sd/shared";

import { UseResource } from "../../types/use-resource";
import { useGetArrayObject } from "./extends/use-get-array-object";

export const useDeployment: UseResource = () => {
  const deployments = useGetArrayObject(ResourceTypes.DEPLOYMENT);

  return useCallback(
    ({ addNode }) => {
      deployments.forEach(deployment => {
        addNode(ResourceTypes.DEPLOYMENT, deployment);
      });
    },
    [deployments]
  );
};
