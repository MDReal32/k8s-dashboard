import { useCallback } from "react";

import { ResourceTypes } from "@k8sd/shared";

import { UseResource } from "../../types/use-resource";
import { useGetArrayObject } from "../use-get-array-object";
import { useAddOwnerReferences } from "./extends/use-add-owner-references";
import { useConvertToGraphNode } from "./extends/use-convert-to-graph-node";

export const usePod: UseResource = () => {
  const convertToGraphNode = useConvertToGraphNode();
  const pods = useGetArrayObject(ResourceTypes.POD);
  const addOwnerReference = useAddOwnerReferences();

  return useCallback(
    ({ addNode, addEdge, addQueue }) => {
      pods.forEach(pod => {
        addNode(convertToGraphNode(ResourceTypes.POD, pod));

        addQueue(() => {
          addOwnerReference(pod, { addEdge });
        });
      });
    },
    [pods, convertToGraphNode, addOwnerReference]
  );
};
