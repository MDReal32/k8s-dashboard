import { useCallback } from "react";

import { ResourceTypes } from "@k8sd/shared";

import { UseResource } from "../../types/use-resource";
import { useAddOwnerReferences } from "./extends/use-add-owner-references";
import { useGetArrayObject } from "./extends/use-get-array-object";

export const useDaemonSet: UseResource = () => {
  const daemonSets = useGetArrayObject(ResourceTypes.DEPLOYMENT);
  const addOwnerReference = useAddOwnerReferences();

  return useCallback(
    ({ addNode, addEdge, addQueue }) => {
      daemonSets.forEach(daemonSet => {
        addNode(ResourceTypes.DEPLOYMENT, daemonSet);

        addQueue(() => {
          addOwnerReference(daemonSet, { addEdge });
        });
      });
    },
    [daemonSets, addOwnerReference]
  );
};
