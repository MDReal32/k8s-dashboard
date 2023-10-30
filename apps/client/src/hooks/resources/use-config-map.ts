import { useCallback } from "react";

import { ResourceTypes } from "@k8sd/shared";

import { UseResource } from "../../types/use-resource";
import { useGetArrayObject } from "./extends/use-get-array-object";

export const useConfigMap: UseResource = () => {
  const configMaps = useGetArrayObject(ResourceTypes.CONFIG_MAP);

  return useCallback(
    ({ addNode }) => {
      configMaps.forEach(configMap => {
        addNode(ResourceTypes.CONFIG_MAP, configMap);
      });
    },
    [configMaps]
  );
};
