import { useCallback } from "react";

import { ResourceTypes } from "@k8sd/shared";

import { UseResource } from "../../types/use-resource";
import { useConvertToGraphNode } from "./extends/use-convert-to-graph-node";
import { useGetArrayObject } from "./extends/use-get-array-object";

export const useConfigMap: UseResource = () => {
  const convertToGraphNode = useConvertToGraphNode();
  const configMaps = useGetArrayObject(ResourceTypes.CONFIG_MAP);

  return useCallback(
    ({ addNode }) => {
      configMaps.forEach(configMap => {
        addNode(convertToGraphNode(ResourceTypes.CONFIG_MAP, configMap));
      });
    },
    [configMaps, convertToGraphNode]
  );
};
