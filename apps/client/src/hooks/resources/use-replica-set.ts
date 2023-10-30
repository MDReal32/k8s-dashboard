import { useCallback } from "react";

import { ResourceTypes } from "@k8sd/shared";

import { UseResource } from "../../types/use-resource";
import { useAddOwnerReferences } from "./extends/use-add-owner-references";
import { useGetArrayObject } from "./extends/use-get-array-object";

export const useReplicaSet: UseResource = () => {
  const replicaSets = useGetArrayObject(ResourceTypes.REPLICA_SET);
  const addOwnerReference = useAddOwnerReferences();

  return useCallback(
    ({ addNode, addEdge, addQueue }) => {
      replicaSets.forEach(replicaSet => {
        addNode(ResourceTypes.REPLICA_SET, replicaSet);

        addQueue(() => {
          addOwnerReference(replicaSet, { addEdge });
        });
      });
    },
    [replicaSets, addOwnerReference]
  );
};
