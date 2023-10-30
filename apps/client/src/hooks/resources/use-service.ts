import { isMatch } from "lodash";
import { useCallback } from "react";

import { ResourceTypes } from "@k8sd/shared";

import { ServiceType } from "../../types";
import { UseResource } from "../../types/use-resource";
import { useConvertToGraphEdge } from "./extends/use-convert-to-graph-edge";
import { useConvertToGraphNode } from "./extends/use-convert-to-graph-node";
import { useGetArrayObject } from "./extends/use-get-array-object";
import { useLoadBalancer } from "./extends/use-load-balancer";

export const useService: UseResource = () => {
  const convertToGraphNode = useConvertToGraphNode();
  const convertToGraphEdge = useConvertToGraphEdge();
  const services = useGetArrayObject(ResourceTypes.SERVICE);
  const loadBalancer = useLoadBalancer();

  return useCallback(
    ({ addNode, addEdge, addQueue, ipAddresses, serviceLabelMap }) => {
      services.forEach(service => {
        addNode(convertToGraphNode(ResourceTypes.SERVICE, service));

        service.spec?.clusterIP && (ipAddresses[service.spec.clusterIP] = service);
        const selector = service.spec?.selector;
        if (selector) {
          const stringifySelector = JSON.stringify(selector);
          const services = serviceLabelMap.get(stringifySelector) || new Set();
          services.add(service);
          serviceLabelMap.set(stringifySelector, services);
        }

        addQueue(() => {
          switch (service.spec?.type) {
            case ServiceType.CLUSTER_IP:
              break;
            case ServiceType.NODE_PORT:
              const selector = service.spec?.selector || {};

              serviceLabelMap.forEach((services, serviceLabel) => {
                const serviceLabelObject = JSON.parse(serviceLabel) as Record<string, string>;
                const matched = isMatch(serviceLabelObject, selector);

                if (matched) {
                  services.forEach(
                    _service =>
                      _service.spec?.type === ServiceType.CLUSTER_IP &&
                      addEdge(convertToGraphEdge(service, _service))
                  );
                }
              });
              break;
            case ServiceType.LOAD_BALANCER:
              loadBalancer(service, { addEdge, ipAddresses });
              break;
            case ServiceType.EXTERNAL_NAME:
              break;
          }
        });
      });
    },
    [services, convertToGraphNode, convertToGraphEdge, loadBalancer]
  );
};
