import { useCallback } from "react";

import { ResourceTypes } from "@k8sd/shared";

import { UseResource } from "../../types/use-resource";
import { useAddOwnerReferences } from "./extends/use-add-owner-references";
import { useConvertToGraphNode } from "./extends/use-convert-to-graph-node";
import { useGetArrayObject } from "./extends/use-get-array-object";

export const useReplicaSet: UseResource = () => {
  const convertToGraphNode = useConvertToGraphNode();
  const replicaSets = useGetArrayObject(ResourceTypes.REPLICA_SET);
  const addOwnerReference = useAddOwnerReferences();

  return useCallback(
    ({ addNode, addEdge, addQueue }) => {
      replicaSets.forEach(replicaSet => {
        addNode(convertToGraphNode(ResourceTypes.REPLICA_SET, replicaSet));

        addQueue(() => {
          addOwnerReference(replicaSet, { addEdge });
        });
      });
    },
    [replicaSets, convertToGraphNode, addOwnerReference]
  );
};
