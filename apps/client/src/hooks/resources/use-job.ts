import { useCallback } from "react";

import { ResourceTypes } from "@k8sd/shared";

import { UseResource } from "../../types/use-resource";
import { useGetArrayObject } from "../use-get-array-object";
import { useAddOwnerReferences } from "./extends/use-add-owner-references";
import { useConvertToGraphNode } from "./extends/use-convert-to-graph-node";

export const useJob: UseResource = () => {
  const convertToGraphNode = useConvertToGraphNode();
  const jobs = useGetArrayObject(ResourceTypes.JOB);
  const addOwnerReference = useAddOwnerReferences();

  return useCallback(
    ({ addNode, addEdge, addQueue }) => {
      jobs.forEach(job => {
        addNode(convertToGraphNode(ResourceTypes.JOB, job));

        addQueue(() => {
          addOwnerReference(job, { addEdge });
        });
      });
    },
    [jobs, convertToGraphNode, addOwnerReference]
  );
};
