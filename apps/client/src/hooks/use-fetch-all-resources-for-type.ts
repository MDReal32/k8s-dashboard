import { useEffect, useMemo } from "react";

import { ParsableResourceTypes, ResourceTypeMap } from "@k8sd/shared";

import { apis } from "../redux/api/resources";
import { useDispatch, useSelector } from "../redux/store";
import { useGetArrayObject } from "./resources/extends/use-get-array-object";

export const useFetchAllResourcesForType = <TResourceType extends ParsableResourceTypes>(
  resourceType: TResourceType
) => {
  const dispatch = useDispatch();
  const nodes = useGetArrayObject(resourceType);

  const responses = useSelector(state => state[`api.k8sd.${resourceType}`]);

  useEffect(() => {
    nodes.forEach(node => {
      dispatch(
        apis[resourceType].endpoints.get.initiate({
          name: node.metadata?.name,
          namespace: node.metadata?.namespace
        })
      );
    });
  }, [nodes]);

  return useMemo(() => {
    return Object.values(responses.queries)
      .filter(response => response?.endpointName === "get")
      .reduce(
        (acc, response) => {
          if (
            response?.status === "fulfilled" &&
            response.data?.success &&
            typeof response.originalArgs === "object"
          ) {
            acc[response.originalArgs?.name] = response.data.data;
          }

          return acc;
        },
        {} as Record<string, ResourceTypeMap[TResourceType]>
      );
  }, [responses]);
};
