import { useEffect, useMemo, useState } from "react";

import { K8sResource, ResourceTypeMap } from "@k8sd/shared";

import { getAppName } from "../utils/get-app-name";
import { UpdateEventTypeEnum, useLiveListenResource } from "./use-live-listen-resource";

type ArrayObjectExtra = {
  dataNameIndexes: Record<string, number>;
  appNameIndexes: Record<string, number[]>;
  uidIndexes: Record<string, number>;
};
export type ArrayObject<TResource extends ResourceTypeMap[K8sResource]> = TResource[] &
  ArrayObjectExtra;

export const useGetArrayObject = <TResourceType extends K8sResource>(
  resourceType: TResourceType,
  initialData: ResourceTypeMap[TResourceType][] | null
): ArrayObject<ResourceTypeMap[TResourceType]> => {
  const action = useLiveListenResource(resourceType);

  const [data, setData] = useState<ResourceTypeMap[TResourceType][]>([]);
  const [dataNameIndexes, setDataNameIndexes] = useState<Record<string, number>>(() => ({}));
  const [appNameIndexes, setAppNameIndexes] = useState<Record<string, number[]>>(() => ({}));
  const [uidIndexes, setUidIndexes] = useState<Record<string, number>>(() => ({}));

  const object = useMemo(() => {
    return Object.assign<ResourceTypeMap[TResourceType][], ArrayObjectExtra>(data, {
      dataNameIndexes,
      appNameIndexes,
      uidIndexes
    });
  }, [data, dataNameIndexes, appNameIndexes, uidIndexes]);

  useEffect(() => {
    setData(initialData || []);

    initialData?.forEach((datum, idx) => {
      const datumName = datum.metadata?.name;
      if (datumName) {
        setDataNameIndexes(dataNameIndexes => ({ ...dataNameIndexes, [datumName]: idx }));
      }

      const appName = getAppName(datum);
      if (appName) {
        setAppNameIndexes(appNameIndexes => ({
          ...appNameIndexes,
          [appName]: [...(appNameIndexes[appName] || []), idx]
        }));
      }

      const uid = datum.metadata?.uid;
      if (uid) {
        setUidIndexes(uidIndexes => ({ ...uidIndexes, [uid]: idx }));
      }
    });
  }, [initialData]);

  useEffect(() => {
    switch (action?.type) {
      case UpdateEventTypeEnum.ADDED:
        setData(data => {
          return [...data, action.resource];
        });
        break;
      case UpdateEventTypeEnum.MODIFIED:
        setData(data => {
          return data.map(datum => {
            if (datum.metadata?.name === action.resource.metadata?.name) {
              return action.resource;
            }
            return datum;
          });
        });

        break;
      case UpdateEventTypeEnum.DELETED:
        setData(data => {
          return data.filter(datum => {
            return datum.metadata?.name !== action.resource.metadata?.name;
          });
        });
        break;
    }
  }, [action]);

  return object;
};
