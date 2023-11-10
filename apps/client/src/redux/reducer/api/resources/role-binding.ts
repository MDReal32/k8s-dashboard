import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ResourceTypeMap, ResourceTypes } from "@k8sd/shared";

import { Response } from "../../../../types";
import { GetBody } from "../../../../types/get-body";

interface ResourceBody {}

export const roleBindingApi = createApi({
  reducerPath: `api.k8sd.${ResourceTypes.ROLE_BINDING}`,
  baseQuery: fetchBaseQuery({
    baseUrl: new URL(`/api/k8s/v1/${ResourceTypes.ROLE_BINDING}`, window.location.origin).toString()
  }),
  endpoints(builder) {
    return {
      listAll: builder.query<Response<ResourceTypeMap[ResourceTypes.ROLE_BINDING][]>, string>({
        query: namespace => `?namespace=${namespace}`
      }),
      get: builder.query<Response<ResourceTypeMap[ResourceTypes.ROLE_BINDING]>, GetBody>({
        query: ({ name, namespace }) => `/${name}?namespace=${namespace}`
      }),
      create: builder.mutation<Response<ResourceTypeMap[ResourceTypes.ROLE_BINDING]>, ResourceBody>(
        {
          query: body => ({ url: "/", method: "POST", body })
        }
      ),
      patch: builder.mutation<
        Response<ResourceTypeMap[ResourceTypes.ROLE_BINDING]>,
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
