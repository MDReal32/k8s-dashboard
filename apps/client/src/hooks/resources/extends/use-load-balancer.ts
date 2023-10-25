import { ResourceTypeMap, ResourceTypes } from "@k8sd/shared";

import { UseResourceReturnOptions } from "../../../types/use-resource";
import { useGetArrayObject } from "../../use-get-array-object";
import { useConvertToGraphEdge } from "./use-convert-to-graph-edge";

interface UseLoadBalancerOptions
  extends Pick<UseResourceReturnOptions, "addEdge" | "ipAddresses"> {}

export const useLoadBalancer = () => {
  const nodesObject = useGetArrayObject(ResourceTypes.NODE);
  const convertToGraphEdge = useConvertToGraphEdge();

  return (
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
  };
};
