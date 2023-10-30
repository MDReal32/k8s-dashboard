import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ResourceTypeMap, ResourceTypes } from "@k8sd/shared";

import { Response } from "../../../types";
import { GetBody } from "../../../types/get-body";

interface ResourceBody {}

export const serviceAccountApi = createApi({
  reducerPath: `api.k8sd.${ResourceTypes.SERVICE_ACCOUNT}`,
  baseQuery: fetchBaseQuery({
    baseUrl: new URL(
      `/api/k8s/v1/${ResourceTypes.SERVICE_ACCOUNT}`,
      window.location.origin
    ).toString()
  }),
  endpoints(builder) {
    return {
      listAll: builder.query<Response<ResourceTypeMap[ResourceTypes.SERVICE_ACCOUNT][]>, string>({
        query: namespace => `?namespace=${namespace}`
      }),
      get: builder.query<Response<ResourceTypeMap[ResourceTypes.SERVICE_ACCOUNT]>, GetBody>({
        query: ({ name, namespace }) => `/${name}?namespace=${namespace}`
      }),
      create: builder.mutation<
        Response<ResourceTypeMap[ResourceTypes.SERVICE_ACCOUNT]>,
        ResourceBody
      >({
        query: body => ({ url: "/", method: "POST", body })
      }),
      patch: builder.mutation<
        Response<ResourceTypeMap[ResourceTypes.SERVICE_ACCOUNT]>,
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
