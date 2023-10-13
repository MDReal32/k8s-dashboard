import { Subscription, from, switchMap } from "rxjs";
import { fromFetch } from "rxjs/fetch";

import { API_URL } from "../const";
import { ResourceTypeMap, ResourceTypes, Response, RxApiStream } from "../types";

export const fetch$ = <T extends ResourceTypes>(
  url: string,
  options?: RequestInit
): RxApiStream<Response<ResourceTypeMap[T][]>> => {
  const stream = fromFetch(`${API_URL}${url}`, options).pipe(
    switchMap(response => {
      if (response.ok) {
        return from(response.json() as Promise<Response<ResourceTypeMap[T][]>>);
      } else {
        throw response;
      }
    })
  );
  let subscription: Subscription | undefined;

  return Object.assign(stream, {
    promisify() {
      return new Promise<Response<ResourceTypeMap[T][]>>((resolve, reject) => {
        subscription = stream.subscribe({
          next: response => {
            resolve(response);
          },
          error: err => {
            reject(err);
          }
        });
      });
    },
    abort() {
      if (!subscription) return;
      subscription.unsubscribe();
      subscription = undefined;
    }
  });
};
