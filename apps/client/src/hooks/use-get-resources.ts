import { useEffect, useState } from "react";

import { ResourceTypeMap, ResourceTypes } from "@k8sd/shared";

import { requests } from "../api/requests";
import { SuccessResponse } from "../types";

type FixName<T extends string> = T extends `${infer F}-${infer R}` ? `${F}${Capitalize<R>}` : T;
const fixName = <T extends string>(name: T): FixName<T> =>
  name.replace(/-(\w)/g, (_, c) => c.toUpperCase()) as FixName<T>;

export type ResourceObject<T extends ResourceTypes[]> = {
  [Key in T[number] as FixName<Key>]: SuccessResponse<ResourceTypeMap[Key][]>;
};

export const useGetResources = <T extends ResourceTypes[]>(
  namespace: string,
  resourceTypes: T
): ResourceObject<T> => {
  const resourceObject = resourceTypes.reduce(
    (acc, resourceType) => ({
      ...acc,
      [fixName(resourceType)]: { success: false, data: null, error: null }
    }),
    {} as ResourceObject<T>
  );
  const [resources, setResources] = useState(resourceObject);

  useEffect(() => {
    const aborts = resourceTypes.map(resourceType => {
      const fetch = requests.k8s[resourceType].list;
      const stream = fetch(namespace);
      stream.promisify().then(data => {
        if (data.success) {
          setResources(prev => ({ ...prev, [fixName(resourceType)]: data }));
        } else {
          console.error(data.error);
        }
      });

      return stream.abort;
    });

    return () => {
      aborts.map(abort => abort());
    };
  }, [namespace]);

  return resources;
};
