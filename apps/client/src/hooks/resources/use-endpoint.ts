import { isMatch } from "lodash";
import { useCallback } from "react";

import { ParsableResourceTypes, ResourceTypeMap, ResourceTypes } from "@k8sd/shared";

import { UseResource } from "../../types/use-resource";
import { convertKindToResourceType } from "../../utils/convert-kind-to-resource-type";
import { useConvertToGraphEdge } from "./extends/use-convert-to-graph-edge";
import { useConvertToGraphNode } from "./extends/use-convert-to-graph-node";
import { useGetAllResources } from "./extends/use-get-all-resources";
import { useGetArrayObject } from "./extends/use-get-array-object";

export const useEndpoint: UseResource = () => {
  const convertToGraphNode = useConvertToGraphNode();
  const convertToGraphEdge = useConvertToGraphEdge();
  const endpoints = useGetArrayObject(ResourceTypes.ENDPOINT);
  const allObjects = useGetAllResources();

  return useCallback(
    ({ addQueue, addEdge, serviceLabelMap }) => {
      endpoints.map(endpoint => {
        for (const [labelString, services] of serviceLabelMap.entries()) {
          const labels = JSON.parse(labelString) as Record<string, string>;
          if (isMatch(endpoint.metadata?.labels || {}, labels)) {
            const addressNodes = endpoint.subsets
              ?.flatMap(subset => subset?.addresses)
              .filter(address => address?.ip)
              .map(address => address?.targetRef)
              .filter(Boolean);

            addQueue(() => {
              services.forEach(service => {
                addressNodes?.forEach(addressNode => {
                  const targetResourceType = convertKindToResourceType<ParsableResourceTypes>(
                    addressNode?.kind || ""
                  );
                  const objects = allObjects[targetResourceType];
                  const object = objects[objects.uidIndexes[addressNode.uid || ""]];

                  if (targetResourceType === ResourceTypes.POD) {
                    const obj = object as ResourceTypeMap[ResourceTypes.POD];
                    const serviceAccounts = allObjects[ResourceTypes.SERVICE_ACCOUNT];
                    const serviceAccount =
                      serviceAccounts[
                        serviceAccounts.dataNameIndexes[obj?.spec?.serviceAccountName || "default"]
                      ];

                    if (object && serviceAccount) {
                      addEdge(convertToGraphEdge(serviceAccount, object));
                      addEdge(convertToGraphEdge(service, serviceAccount));
                    }
                  } else if (object) {
                    addEdge(convertToGraphEdge(service, object));
                  }
                });
              });
            });
          }
        }
      });
    },
    [endpoints, allObjects, convertToGraphNode, convertToGraphEdge]
  );
};
