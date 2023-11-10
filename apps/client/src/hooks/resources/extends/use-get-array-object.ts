import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { ParsableResourceTypes, ResourceTypeMap } from "@k8sd/shared";

import { resourceApis } from "../../../redux/reducer/api/resources";
import { getAppName } from "../../../utils/get-app-name";

type ArrayObjectExtra = {
  dataNameIndexes: Record<string, number>;
  nodeNameIndexes: Record<string, number>;
  appNameIndexes: Record<string, number[]>;
  uidIndexes: Record<string, number>;
};
export type ArrayObject<TResource extends ResourceTypeMap[ParsableResourceTypes]> = TResource[] &
  ArrayObjectExtra;

export const useGetArrayObject = <TResourceType extends ParsableResourceTypes>(
  resourceType: TResourceType
): ArrayObject<ResourceTypeMap[TResourceType]> => {
  const { namespace = "default" } = useParams();
  const { data: nodes } = resourceApis[resourceType].endpoints.listAll.useQuery(namespace);

  return useMemo(() => {
    const dataNameIndexes: Record<string, number> = {};
    const nodeNameIndexes: Record<string, number> = {};
    const appNameIndexes: Record<string, number[]> = {};
    const uidIndexes: Record<string, number> = {};

    if (!nodes || !nodes.success) {
      return Object.assign([], {
        dataNameIndexes,
        nodeNameIndexes,
        appNameIndexes,
        uidIndexes
      });
    }

    nodes.data.forEach((node, idx) => {
      const datumName = node.metadata?.name;
      if (datumName) {
        dataNameIndexes[datumName] = idx;
      }

      const nodeName = node.metadata?.name;
      if (nodeName) {
        nodeNameIndexes[nodeName] = idx;
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
      nodeNameIndexes,
      appNameIndexes,
      uidIndexes
    });
  }, [nodes]);
};
