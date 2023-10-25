import { useMemo } from "react";

import { ResourceTypeMap, ResourceTypes } from "@k8sd/shared";

import { ArrayObject, useGetArrayObject } from "../../use-get-array-object";

export const useGetAllResources = () => {
  const namespaceObject = useGetArrayObject(ResourceTypes.NAMESPACE);
  const nodesObject = useGetArrayObject(ResourceTypes.NODE);
  const ingressesObject = useGetArrayObject(ResourceTypes.INGRESS);
  const deploymentsObject = useGetArrayObject(ResourceTypes.DEPLOYMENT);
  const statefulSetsObject = useGetArrayObject(ResourceTypes.STATEFUL_SET);
  const daemonSetsObject = useGetArrayObject(ResourceTypes.DAEMON_SET);
  const replicaSetsObject = useGetArrayObject(ResourceTypes.REPLICA_SET);
  const servicesObject = useGetArrayObject(ResourceTypes.SERVICE);
  const jobsObject = useGetArrayObject(ResourceTypes.JOB);
  const podsObject = useGetArrayObject(ResourceTypes.POD);
  const configMapObject = useGetArrayObject(ResourceTypes.CONFIG_MAP);
  const secretObject = useGetArrayObject(ResourceTypes.SECRET);

  return useMemo(
    () =>
      ({
        [ResourceTypes.NAMESPACE]: namespaceObject,
        [ResourceTypes.NODE]: nodesObject,
        [ResourceTypes.INGRESS]: ingressesObject,
        [ResourceTypes.DEPLOYMENT]: deploymentsObject,
        [ResourceTypes.STATEFUL_SET]: statefulSetsObject,
        [ResourceTypes.DAEMON_SET]: daemonSetsObject,
        [ResourceTypes.REPLICA_SET]: replicaSetsObject,
        [ResourceTypes.SERVICE]: servicesObject,
        [ResourceTypes.JOB]: jobsObject,
        [ResourceTypes.POD]: podsObject,
        [ResourceTypes.CONFIG_MAP]: configMapObject,
        [ResourceTypes.SECRET]: secretObject
      }) satisfies Record<ResourceTypes, ArrayObject<ResourceTypeMap[ResourceTypes]>>,
    [
      namespaceObject,
      nodesObject,
      ingressesObject,
      deploymentsObject,
      statefulSetsObject,
      daemonSetsObject,
      replicaSetsObject,
      servicesObject,
      jobsObject,
      podsObject,
      secretObject,
      configMapObject
    ]
  );
};
