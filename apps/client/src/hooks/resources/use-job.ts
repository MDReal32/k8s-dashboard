import { useCallback } from "react";

import { ResourceTypes } from "@k8sd/shared";

import { UseResource } from "../../types/use-resource";
import { useAddOwnerReferences } from "./extends/use-add-owner-references";
import { useGetArrayObject } from "./extends/use-get-array-object";

export const useJob: UseResource = () => {
  const jobs = useGetArrayObject(ResourceTypes.JOB);
  const addOwnerReference = useAddOwnerReferences();

  return useCallback(
    ({ addNode, addEdge, addQueue }) => {
      jobs.forEach(job => {
        addNode(ResourceTypes.JOB, job);

        addQueue(() => {
          addOwnerReference(job, { addEdge });
        });
      });
    },
    [jobs, addOwnerReference]
  );
};
