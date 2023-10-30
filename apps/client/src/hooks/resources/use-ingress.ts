import { useCallback } from "react";

import { ResourceTypes } from "@k8sd/shared";

import { UseResource } from "../../types/use-resource";
import { useGetArrayObject } from "./extends/use-get-array-object";
import { useLoadBalancer } from "./extends/use-load-balancer";

export const useIngress: UseResource = () => {
  const loadBalancer = useLoadBalancer();
  const ingresses = useGetArrayObject(ResourceTypes.INGRESS);
  const services = useGetArrayObject(ResourceTypes.SERVICE);

  return useCallback(
    ({ addNode, addEdge, addQueue, ipAddresses }) => {
      ingresses.forEach(ingress => {
        const updateNode = addNode(ResourceTypes.INGRESS, ingress);
        updateNode(graphNode => {
          graphNode.label =
            ingress.spec?.rules?.map(rule => rule.host).join(", ") || graphNode.label;
        });

        addQueue(() => {
          loadBalancer(ingress, { ipAddresses, addEdge });

          ingress.spec?.rules
            ?.flatMap(rule => rule.http?.paths || [])
            .map(path => path.backend.service?.name)
            .map(serviceName => serviceName && services[services.dataNameIndexes[serviceName]])
            .filter(Boolean)
            .forEach(service => addEdge(ingress, service));
        });
      });
    },
    [ingresses, services, loadBalancer]
  );
};
