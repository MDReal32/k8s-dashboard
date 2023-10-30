import { useCallback } from "react";

import { ResourceTypeMap, ResourceTypes } from "@k8sd/shared";

import { UseResourceReturnFnOptions } from "../../../types/use-resource";
import { useConvertToGraphEdge } from "./use-convert-to-graph-edge";
import { useGetArrayObject } from "./use-get-array-object";

interface UseLoadBalancerOptions
  extends Pick<UseResourceReturnFnOptions, "addEdge" | "ipAddresses"> {}

export const useLoadBalancer = () => {
  const nodesObject = useGetArrayObject(ResourceTypes.NODE);
  const convertToGraphEdge = useConvertToGraphEdge();

  return useCallback(
    (
      node: ResourceTypeMap[ResourceTypes.INGRESS | ResourceTypes.SERVICE],
      { addEdge, ipAddresses }: UseLoadBalancerOptions
    ) => {
      const loadBalancer = node.status?.loadBalancer;
      if (loadBalancer) {
        loadBalancer.ingress?.forEach(ingressLoadBalancer => {
          const ip = ingressLoadBalancer.ip;
          if (!ip) return;
          if (ip in ipAddresses) addEdge(convertToGraphEdge(ipAddresses[ip], node));
        });
      } else {
        addEdge(convertToGraphEdge(nodesObject[nodesObject.dataNameIndexes.minikube], node));
      }
    },
    [nodesObject, convertToGraphEdge]
  );
};
