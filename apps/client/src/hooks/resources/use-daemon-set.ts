import { useCallback } from "react";

import { ResourceTypes } from "@k8sd/shared";

import { UseResource } from "../../types/use-resource";
import { useGetArrayObject } from "../use-get-array-object";
import { useAddOwnerReferences } from "./extends/use-add-owner-references";
import { useConvertToGraphNode } from "./extends/use-convert-to-graph-node";

export const useDaemonSet: UseResource = () => {
  const convertToGraphNode = useConvertToGraphNode();
  const daemonSets = useGetArrayObject(ResourceTypes.DEPLOYMENT);
  const addOwnerReference = useAddOwnerReferences();

  return useCallback(
    ({ addNode, addEdge, addQueue }) => {
      daemonSets.forEach(daemonSet => {
        addNode(convertToGraphNode(ResourceTypes.DEPLOYMENT, daemonSet));

        addQueue(() => {
          addOwnerReference(daemonSet, { addEdge });
        });
      });
    },
    [daemonSets, convertToGraphNode, addOwnerReference]
  );
};
