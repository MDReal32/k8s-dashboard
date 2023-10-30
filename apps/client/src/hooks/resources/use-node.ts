import { useCallback } from "react";

import { ResourceTypes } from "@k8sd/shared";

import { UseResource } from "../../types/use-resource";
import { useGetArrayObject } from "./extends/use-get-array-object";

export const useNode: UseResource = () => {
  const nodes = useGetArrayObject(ResourceTypes.NODE);

  return useCallback(
    ({ addNode, ipAddresses, ipMappings }) => {
      nodes.forEach(node => {
        const internalIpAddress = node.status?.addresses?.find(
          address => address.type === "InternalIP"
        )?.address;

        const updateNode = addNode(ResourceTypes.NODE, node);
        updateNode(graphNode => {
          graphNode.label = internalIpAddress || graphNode.label;
        });

        internalIpAddress && (ipAddresses[internalIpAddress] = node);
        node.spec?.podCIDR && (ipMappings[node.spec.podCIDR] = node);
      });
    },
    [nodes]
  );
};
