import { useCallback } from "react";

import { ResourceTypes } from "@k8sd/shared";

import { UseResource } from "../../types/use-resource";
import { useConvertToGraphEdge } from "./extends/use-convert-to-graph-edge";
import { useConvertToGraphNode } from "./extends/use-convert-to-graph-node";
import { useGetArrayObject } from "./extends/use-get-array-object";
import { useLoadBalancer } from "./extends/use-load-balancer";

export const useIngress: UseResource = () => {
  const convertToGraphNode = useConvertToGraphNode();
  const convertToGraphEdge = useConvertToGraphEdge();
  const loadBalancer = useLoadBalancer();
  const ingresses = useGetArrayObject(ResourceTypes.INGRESS);
  const services = useGetArrayObject(ResourceTypes.SERVICE);

  return useCallback(
    ({ addNode, addEdge, addQueue, ipAddresses }) => {
      ingresses.forEach(ingress => {
        const graphNode = convertToGraphNode(ResourceTypes.INGRESS, ingress);
        graphNode.label = ingress.spec?.rules?.map(rule => rule.host).join(", ") || graphNode.label;
        addNode(graphNode);

        addQueue(() => {
          loadBalancer(ingress, { ipAddresses, addEdge });

          ingress.spec?.rules
            ?.flatMap(rule => rule.http?.paths || [])
            .map(path => path.backend.service?.name)
            .map(serviceName => serviceName && services[services.dataNameIndexes[serviceName]])
            .filter(Boolean)
            .forEach(service => addEdge(convertToGraphEdge(ingress, service)));
        });
      });
    },
    [ingresses, services, convertToGraphNode, convertToGraphEdge, loadBalancer]
  );
};
