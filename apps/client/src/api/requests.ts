import { Observable, of, switchMap } from "rxjs";

import { ResourceTypeMap, ResourceTypes, Response, RxApiStream } from "../types";
import { fetch$ } from "../utils/fetch$";

const resource =
  <TResourceType extends ResourceTypes>(resourceType: TResourceType) =>
  (namespace: string) =>
    fetch$<TResourceType>(
      `/k8s/v1/${ResourceTypes.NAMESPACE}/${namespace}/resource/${resourceType}`
    );

type Resource<T extends ResourceTypes> = {
  list: (namespace: string) => RxApiStream<Response<ResourceTypeMap[T][]>>;
};

export const requests = {
  k8s: Object.values(ResourceTypes).reduce(
    (acc, resourceType) => {
      acc[resourceType] = {
        list:
          resourceType === ResourceTypes.NAMESPACE
            ? () => resource(resourceType)("_")
            : resource(resourceType)
      };
      return acc;
    },
    {} as Record<ResourceTypes, Resource<ResourceTypes>>
  )
};
