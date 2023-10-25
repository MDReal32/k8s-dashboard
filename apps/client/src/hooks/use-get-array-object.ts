import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { ResourceTypeMap, ResourceTypes } from "@k8sd/shared";

import { resourcesApi } from "../redux/api";
import { getAppName } from "../utils/get-app-name";

type ArrayObjectExtra = {
  dataNameIndexes: Record<string, number>;
  appNameIndexes: Record<string, number[]>;
  uidIndexes: Record<string, number>;
};
export type ArrayObject<TResource extends ResourceTypeMap[ResourceTypes]> = TResource[] &
  ArrayObjectExtra;

export const useGetArrayObject = <TResourceType extends ResourceTypes>(
  resourceType: TResourceType
): ArrayObject<ResourceTypeMap[TResourceType]> => {
  const { namespace = "default" } = useParams();
  const { data: nodes } = resourcesApi.endpoints[resourceType].useQuery(namespace);

  return useMemo(() => {
    const dataNameIndexes: Record<string, number> = {};
    const appNameIndexes: Record<string, number[]> = {};
    const uidIndexes: Record<string, number> = {};

    if (!nodes || !nodes.success) {
      return Object.assign([], {
        dataNameIndexes,
        appNameIndexes,
        uidIndexes
      });
    }

    nodes.data.forEach((node, idx) => {
      const datumName = node.metadata?.name;
      if (datumName) {
        dataNameIndexes[datumName] = idx;
      }

      const appName = getAppName(node);
      if (appName) {
        appNameIndexes[appName] = appNameIndexes[appName] || [];
        appNameIndexes[appName].push(idx);
      }

      const uid = node.metadata?.uid;
      if (uid) {
        uidIndexes[uid] = idx;
      }
    });

    // @ts-ignore
    return Object.assign<ResourceTypeMap[TResourceType][], ArrayObjectExtra>([...nodes.data], {
      dataNameIndexes,
      appNameIndexes,
      uidIndexes
    });
  }, [nodes]);
};
