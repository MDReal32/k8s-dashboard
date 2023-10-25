import { useCallback } from "react";

import { ResourceTypes } from "@k8sd/shared";

import { UseResource } from "../../types/use-resource";
import { useGetArrayObject } from "../use-get-array-object";
import { useAddOwnerReferences } from "./extends/use-add-owner-references";
import { useConvertToGraphNode } from "./extends/use-convert-to-graph-node";

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
