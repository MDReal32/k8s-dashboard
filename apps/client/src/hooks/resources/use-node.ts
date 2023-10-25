import { useCallback } from "react";

import { ResourceTypes } from "@k8sd/shared";

import { UseResource } from "../../types/use-resource";
import { useGetArrayObject } from "../use-get-array-object";
import { useConvertToGraphNode } from "./extends/use-convert-to-graph-node";

export const useNode: UseResource = () => {
  const convertToGraphNode = useConvertToGraphNode();
  const nodes = useGetArrayObject(ResourceTypes.NODE);

  return useCallback(
    ({ addNode, ipAddresses, ipMappings }) => {
      nodes.forEach(node => {
        const internalIpAddress = node.status?.addresses?.find(
          address => address.type === "InternalIP"
        )?.address;

        const graphNode = convertToGraphNode(ResourceTypes.NODE, node);
        graphNode.label = internalIpAddress || graphNode.label;
        addNode(graphNode);

        internalIpAddress && (ipAddresses[internalIpAddress] = node);
        node.spec?.podCIDR && (ipMappings[node.spec.podCIDR] = node);
      });
    },
    [nodes, useConvertToGraphNode]
  );
};
