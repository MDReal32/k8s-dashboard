import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ALL_NAMESPACES, ResourceTypeMap, ResourceTypes } from "@k8sd/shared";

import { Response } from "../../../../types";
import { GetBody } from "../../../../types/get-body";

interface ResourceBody {}

export const namespaceApi = createApi({
  reducerPath: `api.k8sd.${ResourceTypes.NAMESPACE}`,
  baseQuery: fetchBaseQuery({
    baseUrl: new URL(`/api/k8s/v1/${ResourceTypes.NAMESPACE}`, window.location.origin).toString()
  }),
  endpoints(builder) {
    return {
      listAll: builder.query<Response<ResourceTypeMap[ResourceTypes.NAMESPACE][]>, string>({
        query: () => `?namespace=${ALL_NAMESPACES}`
      }),
      get: builder.query<Response<ResourceTypeMap[ResourceTypes.NAMESPACE]>, GetBody>({
        query: ({ name, namespace }) => `/${name}?namespace=${namespace}`
      }),
      create: builder.mutation<Response<ResourceTypeMap[ResourceTypes.NAMESPACE]>, ResourceBody>({
        query: body => ({ url: "/", method: "POST", body })
      }),
      patch: builder.mutation<
        Response<ResourceTypeMap[ResourceTypes.NAMESPACE]>,
        ResourceBody & { name: string }
      >({
        query: ({ name, ...body }) => ({ url: `/${name}`, method: "PATCH", body })
      }),
      delete: builder.mutation<Response<void>, string>({
        query: name => ({ url: `/${name}`, method: "DELETE" })
      })
    };
  }
});
