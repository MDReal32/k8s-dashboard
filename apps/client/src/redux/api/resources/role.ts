import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ResourceTypeMap, ResourceTypes } from "@k8sd/shared";

import { Response } from "../../../types";
import { GetBody } from "../../../types/get-body";

interface ResourceBody {}

export const roleApi = createApi({
  reducerPath: `api.k8sd.${ResourceTypes.ROLE}`,
  baseQuery: fetchBaseQuery({
    baseUrl: new URL(`/api/k8s/v1/${ResourceTypes.ROLE}`, window.location.origin).toString()
  }),
  endpoints(builder) {
    return {
      listAll: builder.query<Response<ResourceTypeMap[ResourceTypes.ROLE][]>, string>({
        query: namespace => `?namespace=${namespace}`
      }),
      get: builder.query<Response<ResourceTypeMap[ResourceTypes.ROLE]>, GetBody>({
        query: ({ name, namespace }) => `/${name}?namespace=${namespace}`
      }),
      create: builder.mutation<Response<ResourceTypeMap[ResourceTypes.ROLE]>, ResourceBody>({
        query: body => ({ url: "/", method: "POST", body })
      }),
      patch: builder.mutation<
        Response<ResourceTypeMap[ResourceTypes.ROLE]>,
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
