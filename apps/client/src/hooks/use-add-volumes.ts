import { useCallback } from "react";

import { ResourceTypeMap, ResourceTypes } from "@k8sd/shared";

import { UseResourceReturnFnOptions } from "../types/use-resource";
import { useConvertToGraphEdge } from "./resources/extends/use-convert-to-graph-edge";
import { useGetArrayObject } from "./resources/extends/use-get-array-object";

interface UseAddVolumes extends Pick<UseResourceReturnFnOptions, "addEdge"> {
  source: ResourceTypeMap[ResourceTypes];
}

export const useAddVolumes = () => {
  const configMaps = useGetArrayObject(ResourceTypes.CONFIG_MAP);
  const convertToGraphEdge = useConvertToGraphEdge();

  return useCallback(
    (
      volumes: ResourceTypeMap[ResourceTypes.VOLUME][] | undefined,
      { source: sourceNode, addEdge }: UseAddVolumes
    ) => {
      if (!volumes) return;

      for (const volume of volumes) {
        if (volume.flexVolume) {
          // console.log("volume.flexVolume", volume.flexVolume);
        }

        if (volume.configMap) {
          // console.log("volume.configMap", volume.configMap);
        }

        if (volume.downwardAPI) {
          // console.log("volume.downwardAPI", volume.downwardAPI);
        }

        if (volume.projected) {
          volume.projected.sources?.forEach(source => {
            if (source.configMap) {
              const configMap = configMaps[configMaps.nodeNameIndexes[source.configMap.name || ""]];
              if (configMap) {
                addEdge(convertToGraphEdge(sourceNode, configMap));
              }
            }

            if (source.secret) {
              // console.log("source.secret", source.secret);
            }

            if (source.serviceAccountToken) {
              // console.log("source.serviceAccountToken", source.serviceAccountToken, source);
            }

            // if (source.downwardAPI) {
            //   console.log("source.downwardAPI", source.downwardAPI, sourceNode);
            // }
          });

          // console.log("volume.projected", volume.projected);
        }

        if (volume.gitRepo) {
          // console.log("volume.gitRepo", volume.gitRepo);
        }
      }
    },
    [configMaps, convertToGraphEdge]
  );
};
