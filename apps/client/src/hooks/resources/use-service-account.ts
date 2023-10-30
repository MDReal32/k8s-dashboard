import { useCallback } from "react";

import { ResourceTypes } from "@k8sd/shared";

import { UseResource } from "../../types/use-resource";
import { useConvertToGraphNode } from "./extends/use-convert-to-graph-node";
import { useGetArrayObject } from "./extends/use-get-array-object";
import { useLabel } from "./extends/use-label";

export const useServiceAccount: UseResource = () => {
  const convertToGraphNode = useConvertToGraphNode();
  const serviceAccounts = useGetArrayObject(ResourceTypes.SERVICE_ACCOUNT);
  const byLabel = useLabel();

  return useCallback(
    ({ addNode, addQueue, addEdge, serviceLabelMap }) => {
      serviceAccounts.forEach(serviceAccount => {
        addNode(convertToGraphNode(ResourceTypes.SERVICE_ACCOUNT, serviceAccount));

        addQueue(() => {
          byLabel(serviceAccount, { addEdge, serviceLabelMap });
        });
      });
    },
    [serviceAccounts, convertToGraphNode]
  );
};
