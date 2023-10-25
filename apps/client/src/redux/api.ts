import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ResourceTypeMap, ResourceTypes } from "@k8sd/shared";

import { Response } from "../types";

export const resourcesApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: new URL("/api", window.location.origin).toString() }),
  endpoints(builder) {
    return {
      [ResourceTypes.NAMESPACE]: builder.query<
        Response<ResourceTypeMap[ResourceTypes.NAMESPACE][]>,
        {}
      >({
        query: () => `/k8s/v1/${ResourceTypes.NAMESPACE}/_/resource/${ResourceTypes.NAMESPACE}`
      }),
      [ResourceTypes.NODE]: builder.query<Response<ResourceTypeMap[ResourceTypes.NODE][]>, {}>({
        query: () => `/k8s/v1/${ResourceTypes.NODE}`
      }),
      [ResourceTypes.INGRESS]: builder.query<
        Response<ResourceTypeMap[ResourceTypes.INGRESS][]>,
        {}
      >({
        query: (namespace: string) =>
          `/k8s/v1/${ResourceTypes.NAMESPACE}/${namespace}/resource/${ResourceTypes.INGRESS}`
      }),
      [ResourceTypes.DEPLOYMENT]: builder.query<
        Response<ResourceTypeMap[ResourceTypes.DEPLOYMENT][]>,
        {}
      >({
        query: (namespace: string) =>
          `/k8s/v1/${ResourceTypes.NAMESPACE}/${namespace}/resource/${ResourceTypes.DEPLOYMENT}`
      }),
      [ResourceTypes.STATEFUL_SET]: builder.query<
        Response<ResourceTypeMap[ResourceTypes.STATEFUL_SET][]>,
        {}
      >({
        query: (namespace: string) =>
          `/k8s/v1/${ResourceTypes.NAMESPACE}/${namespace}/resource/${ResourceTypes.STATEFUL_SET}`
      }),
      [ResourceTypes.DAEMON_SET]: builder.query<
        Response<ResourceTypeMap[ResourceTypes.DAEMON_SET][]>,
        {}
      >({
        query: (namespace: string) =>
          `/k8s/v1/${ResourceTypes.NAMESPACE}/${namespace}/resource/${ResourceTypes.DAEMON_SET}`
      }),
      [ResourceTypes.REPLICA_SET]: builder.query<
        Response<ResourceTypeMap[ResourceTypes.REPLICA_SET][]>,
        {}
      >({
        query: (namespace: string) =>
          `/k8s/v1/${ResourceTypes.NAMESPACE}/${namespace}/resource/${ResourceTypes.REPLICA_SET}`
      }),
      [ResourceTypes.SERVICE]: builder.query<
        Response<ResourceTypeMap[ResourceTypes.SERVICE][]>,
        {}
      >({
        query: (namespace: string) =>
          `/k8s/v1/${ResourceTypes.NAMESPACE}/${namespace}/resource/${ResourceTypes.SERVICE}`
      }),
      [ResourceTypes.JOB]: builder.query<Response<ResourceTypeMap[ResourceTypes.JOB][]>, {}>({
        query: (namespace: string) =>
          `/k8s/v1/${ResourceTypes.NAMESPACE}/${namespace}/resource/${ResourceTypes.JOB}`
      }),
      [ResourceTypes.POD]: builder.query<Response<ResourceTypeMap[ResourceTypes.POD][]>, {}>({
        query: (namespace: string) =>
          `/k8s/v1/${ResourceTypes.NAMESPACE}/${namespace}/resource/${ResourceTypes.POD}`
      }),
      [ResourceTypes.CONFIG_MAP]: builder.query<
        Response<ResourceTypeMap[ResourceTypes.CONFIG_MAP][]>,
        {}
      >({
        query: (namespace: string) =>
          `/k8s/v1/${ResourceTypes.NAMESPACE}/${namespace}/resource/${ResourceTypes.CONFIG_MAP}`
      }),
      [ResourceTypes.SECRET]: builder.query<Response<ResourceTypeMap[ResourceTypes.SECRET][]>, {}>({
        query: (namespace: string) =>
          `/k8s/v1/${ResourceTypes.NAMESPACE}/${namespace}/resource/${ResourceTypes.SECRET}`
      })
    };
  }
});

export const {
  useNamespaceQuery,
  useNodeQuery,
  useIngressQuery,
  useDeploymentQuery,
  "useStateful-setQuery": useStatefulSetQuery,
  "useDaemon-setQuery": useDaemonSetQuery,
  "useReplica-setQuery": useReplicaSetQuery,
  useServiceQuery,
  useJobQuery,
  usePodQuery,
  "useConfig-mapQuery": useConfigMapQuery,
  useSecretQuery
} = resourcesApi;
