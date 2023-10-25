import { isMatch } from "lodash";

import { ResourceTypeMap, ResourceTypes } from "@k8sd/shared";

import { UseResourceReturnOptions } from "../../../types/use-resource";
import { useConvertToGraphEdge } from "./use-convert-to-graph-edge";

interface UseLabelOptions extends Pick<UseResourceReturnOptions, "addEdge" | "serviceLabelMap"> {}

export const useLabel = () => {
  const convertToGraphEdge = useConvertToGraphEdge();

  return (node: ResourceTypeMap[ResourceTypes], { addEdge, serviceLabelMap }: UseLabelOptions) => {
    const labels = node.metadata?.labels;
    if (labels) {
      for (const [serviceLabel, services] of serviceLabelMap) {
        const parsedServiceLabel = JSON.parse(serviceLabel) as Record<string, string>;
        const matched = isMatch(labels, parsedServiceLabel);
        if (matched) {
          services.forEach(service => addEdge(convertToGraphEdge(node, service)));
        }
      }
    }
  };
};
