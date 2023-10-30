import { isMatch } from "lodash";
import { useCallback } from "react";

import { ParsableResourceTypes, ResourceTypeMap, ResourceTypes } from "@k8sd/shared";

import { UseResourceReturnFnOptions } from "../../../types/use-resource";

interface UseLabelOptions extends Pick<UseResourceReturnFnOptions, "addEdge" | "serviceLabelMap"> {}

export const useLabel = () => {
  return useCallback(
    (
      node: ResourceTypeMap[Exclude<ParsableResourceTypes, ResourceTypes.ENDPOINT>],
      { addEdge, serviceLabelMap }: UseLabelOptions
    ) => {
      const labels = node.metadata?.labels;
      if (labels) {
        for (const [serviceLabel, services] of serviceLabelMap) {
          const parsedServiceLabel = JSON.parse(serviceLabel) as Record<string, string>;
          const matched = isMatch(labels, parsedServiceLabel);
          if (matched) {
            services.forEach(service => addEdge(node, service));
          }
        }
      }
    },
    []
  );
};
