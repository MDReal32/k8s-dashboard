import { fromFetch } from "rxjs/fetch";
import { Project } from "@prisma/client";
import { PartialDeep } from "type-fest";

import { projectInitSchema } from "@k8sd/shared";

import { Data } from "../types";

export const port = +process.env.SERVER_PORT || 3000;
export const host = process.env.SERVER_HOST || "localhost";
export const baseUrl = process.env.BASE_URL || `http://${host}:${port}/api`;
const url = new URL(baseUrl);
const wsPathname = process.env.WS_PATH || "/ws";
const hostname = url.host === "localhost" ? `:${url.port}` : "";
export const wsUrl = `ws://${url.host}${hostname}${wsPathname}`;

interface Response<TData> {
  success: boolean;
  data: TData;
  error?: null;
}

export const api = {
  k8s: {
    namespace: {
      get$: () =>
        fromFetch<Response<{ id: string; name: string; version: string }[]>>(
          `${baseUrl}/k8s/v1/namespace/_`,
          { selector: response => response.json() }
        ),
      post$: (name: string) =>
        fromFetch<Response<{ id: string; name: string; version: string }>>(
          `${baseUrl}/k8s/v1/namespace`,
          {
            selector: response => response.json(),
            method: "POST",
            body: JSON.stringify({ name })
          }
        )
    }
  },
  project: {
    patch$: (id: string, data: PartialDeep<Data<typeof projectInitSchema, Project>>) =>
      fromFetch<Response<Data<typeof projectInitSchema, Project>>>(`${baseUrl}/v1/project/${id}`, {
        selector: response => response.json(),
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })
  }
};
