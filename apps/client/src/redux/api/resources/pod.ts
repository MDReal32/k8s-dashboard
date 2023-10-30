import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ResourceTypeMap, ResourceTypes } from "@k8sd/shared";

import { Response } from "../../../types";
import { GetBody } from "../../../types/get-body";

interface ResourceBody {}

export const podApi = createApi({
  reducerPath: `api.k8sd.${ResourceTypes.POD}`,
  baseQuery: fetchBaseQuery({
    baseUrl: new URL(`/api/k8s/v1/${ResourceTypes.POD}`, window.location.origin).toString()
  }),
  endpoints(builder) {
    return {
      listAll: builder.query<Response<ResourceTypeMap[ResourceTypes.POD][]>, string>({
        query: namespace => `?namespace=${namespace}`
      }),
      get: builder.query<Response<ResourceTypeMap[ResourceTypes.POD]>, GetBody>({
        query: ({ name, namespace }) => `/${name}?namespace=${namespace}`
      }),
      create: builder.mutation<Response<ResourceTypeMap[ResourceTypes.POD]>, ResourceBody>({
        query: body => ({ url: "/", method: "POST", body })
      }),
      patch: builder.mutation<
        Response<ResourceTypeMap[ResourceTypes.POD]>,
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
