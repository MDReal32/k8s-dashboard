import { useCallback } from "react";

import { ResourceTypes } from "@k8sd/shared";

import { UseResource } from "../../types/use-resource";
import { useGetArrayObject } from "../use-get-array-object";
import { useConvertToGraphNode } from "./extends/use-convert-to-graph-node";

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
