import { useMemo } from "react";

import { ParsableResourceTypes, ResourceTypeMap, ResourceTypes } from "@k8sd/shared";

import { ArrayObject, useGetArrayObject } from "./use-get-array-object";

export const useGetAllResources = () => {
  const namespaceObject = useGetArrayObject(ResourceTypes.NAMESPACE);
  const nodesObject = useGetArrayObject(ResourceTypes.NODE);
  const ingressesObject = useGetArrayObject(ResourceTypes.INGRESS);
  const deploymentsObject = useGetArrayObject(ResourceTypes.DEPLOYMENT);
  const statefulSetsObject = useGetArrayObject(ResourceTypes.STATEFUL_SET);
  const daemonSetsObject = useGetArrayObject(ResourceTypes.DAEMON_SET);
  const replicaSetsObject = useGetArrayObject(ResourceTypes.REPLICA_SET);
  const cronJobsObject = useGetArrayObject(ResourceTypes.CRON_JOB);
  const servicesObject = useGetArrayObject(ResourceTypes.SERVICE);
  const serviceAccountsObject = useGetArrayObject(ResourceTypes.SERVICE_ACCOUNT);
  const horizontalPodAutoscalersObject = useGetArrayObject(ResourceTypes.HORIZONTAL_POD_AUTOSCALER);
  const jobsObject = useGetArrayObject(ResourceTypes.JOB);
  const podsObject = useGetArrayObject(ResourceTypes.POD);
  const endpointsObject = useGetArrayObject(ResourceTypes.ENDPOINT);
  const configMapObject = useGetArrayObject(ResourceTypes.CONFIG_MAP);
  const secretObject = useGetArrayObject(ResourceTypes.SECRET);
  const storageClassObject = useGetArrayObject(ResourceTypes.STORAGE_CLASS);
  const clusterRoleBindingsObject = useGetArrayObject(ResourceTypes.CLUSTER_ROLE_BINDING);
  const roleBindingsObject = useGetArrayObject(ResourceTypes.ROLE_BINDING);
  const rolesObject = useGetArrayObject(ResourceTypes.ROLE);

  return useMemo(() => {
    return {
      [ResourceTypes.NAMESPACE]: namespaceObject,
      [ResourceTypes.NODE]: nodesObject,
      [ResourceTypes.INGRESS]: ingressesObject,
      [ResourceTypes.DEPLOYMENT]: deploymentsObject,
      [ResourceTypes.STATEFUL_SET]: statefulSetsObject,
      [ResourceTypes.DAEMON_SET]: daemonSetsObject,
      [ResourceTypes.REPLICA_SET]: replicaSetsObject,
      [ResourceTypes.CRON_JOB]: cronJobsObject,
      [ResourceTypes.SERVICE]: servicesObject,
      [ResourceTypes.SERVICE_ACCOUNT]: serviceAccountsObject,
      [ResourceTypes.HORIZONTAL_POD_AUTOSCALER]: horizontalPodAutoscalersObject,
      [ResourceTypes.JOB]: jobsObject,
      [ResourceTypes.POD]: podsObject,
      [ResourceTypes.ENDPOINT]: endpointsObject,
      [ResourceTypes.CONFIG_MAP]: configMapObject,
      [ResourceTypes.SECRET]: secretObject,
      [ResourceTypes.STORAGE_CLASS]: storageClassObject,
      [ResourceTypes.CLUSTER_ROLE_BINDING]: clusterRoleBindingsObject,
      [ResourceTypes.ROLE_BINDING]: roleBindingsObject,
      [ResourceTypes.ROLE]: rolesObject
    } satisfies Record<ParsableResourceTypes, ArrayObject<ResourceTypeMap[ParsableResourceTypes]>>;
  }, [
    namespaceObject,
    nodesObject,
    ingressesObject,
    deploymentsObject,
    statefulSetsObject,
    daemonSetsObject,
    replicaSetsObject,
    cronJobsObject,
    servicesObject,
    serviceAccountsObject,
    horizontalPodAutoscalersObject,
    jobsObject,
    podsObject,
    endpointsObject,
    configMapObject,
    secretObject,
    storageClassObject,
    clusterRoleBindingsObject,
    roleBindingsObject,
    rolesObject
  ]);
};
