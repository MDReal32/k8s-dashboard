import { useCallback } from "react";

import { ResourceTypes } from "@k8sd/shared";

import { UseResource } from "../../types/use-resource";
import { useAddVolumes } from "../use-add-volumes";
import { useAddOwnerReferences } from "./extends/use-add-owner-references";
import { useConvertToGraphNode } from "./extends/use-convert-to-graph-node";
import { useGetArrayObject } from "./extends/use-get-array-object";

export const usePod: UseResource = () => {
  const convertToGraphNode = useConvertToGraphNode();
  const pods = useGetArrayObject(ResourceTypes.POD);
  const addOwnerReference = useAddOwnerReferences();
  const addVolumes = useAddVolumes();

  return useCallback(
    ({ addNode, addEdge, addQueue }) => {
      pods.forEach(pod => {
        addNode(convertToGraphNode(ResourceTypes.POD, pod));

        addQueue(() => {
          addOwnerReference(pod, { addEdge });
          addVolumes(pod.spec?.volumes, { source: pod, addEdge });
        });
      });
    },
    [pods, convertToGraphNode, addOwnerReference, addVolumes]
  );
};
