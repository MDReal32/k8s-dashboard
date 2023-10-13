import { useMemo } from "react";

import { K8sResource, ResourceTypeMap } from "../types";
import { getArrayObject } from "../utils/get-array-object";

export type ArrayObject<TResource extends ResourceTypeMap[K8sResource]> = TResource[] & {
  dataObject: Record<string, TResource>;
  byAppName: Record<string, TResource[]>;
};
export const useGetArrayObject = <T extends ResourceTypeMap[K8sResource]>(
  data: T[]
): ArrayObject<T> => {
  return useMemo(() => {
    if (!data) {
      return Object.assign([], { dataObject: {}, byAppName: {} });
    }

    return getArrayObject(data);
  }, [data]);
};
