import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ResourceTypeMap, ResourceTypes } from "@k8sd/shared";

import { Response } from "../../../../types";
import { GetBody } from "../../../../types/get-body";

interface ResourceBody {}

export const storageClassApi = createApi({
  reducerPath: `api.k8sd.${ResourceTypes.STORAGE_CLASS}`,
  baseQuery: fetchBaseQuery({
    baseUrl: new URL(
      `/api/k8s/v1/${ResourceTypes.STORAGE_CLASS}`,
      window.location.origin
    ).toString()
  }),
  endpoints(builder) {
    return {
      listAll: builder.query<Response<ResourceTypeMap[ResourceTypes.STORAGE_CLASS][]>, string>({
        query: namespace => `?namespace=${namespace}`
      }),
      get: builder.query<Response<ResourceTypeMap[ResourceTypes.STORAGE_CLASS]>, GetBody>({
        query: ({ name, namespace }) => `/${name}?namespace=${namespace}`
      }),
      create: builder.mutation<
        Response<ResourceTypeMap[ResourceTypes.STORAGE_CLASS]>,
        ResourceBody
      >({
        query: body => ({ url: "/", method: "POST", body })
      }),
      patch: builder.mutation<
        Response<ResourceTypeMap[ResourceTypes.STORAGE_CLASS]>,
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
