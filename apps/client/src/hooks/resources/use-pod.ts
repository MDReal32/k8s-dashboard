import { useCallback } from "react";

import { ResourceTypes } from "@k8sd/shared";

import { UseResource } from "../../types/use-resource";
import { useAddOwnerReferences } from "./extends/use-add-owner-references";
import { useAddVolumes } from "./extends/use-add-volumes";
import { useGetArrayObject } from "./extends/use-get-array-object";

export const usePod: UseResource = () => {
  const pods = useGetArrayObject(ResourceTypes.POD);
  const serviceAccounts = useGetArrayObject(ResourceTypes.SERVICE_ACCOUNT);
  const addOwnerReference = useAddOwnerReferences();
  const addVolumes = useAddVolumes();

  return useCallback(
    ({ addNode, addEdge, addQueue }) => {
      pods.forEach(pod => {
        addNode(ResourceTypes.POD, pod);

        addQueue(() => {
          addOwnerReference(pod, { addEdge });
          addVolumes(pod.spec?.volumes, { source: pod, addEdge });

          const serviceAccountName = pod.spec?.serviceAccountName?.trim() || "default";
          const index = serviceAccounts.dataNameIndexes[serviceAccountName];
          if (serviceAccounts[index]) {
            addEdge(pod, serviceAccounts[index]);
          }
        });
      });
    },
    [pods, serviceAccounts, addOwnerReference, addVolumes]
  );
};
