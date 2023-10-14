import { useEffect, useMemo } from "react";

import { ResourceTypeMap, ResourceTypes } from "../types";
import { useWebsocket } from "./use-websocket";

export enum UpdateEventTypeEnum {
  ADDED = "ADDED",
  MODIFIED = "MODIFIED",
  DELETED = "DELETED"
}
export type UpdateEvent<TResourceType extends ResourceTypes> = {
  type: UpdateEventTypeEnum;
  resource: ResourceTypeMap[TResourceType];
};

export const useLiveListenResource = <TResourceType extends ResourceTypes>(
  resourceType: TResourceType
) => {
  const path = useMemo(() => {
    const url = new URL(window.location.href);
    url.protocol = url.protocol.replace("http", "ws");
    url.pathname = `/ws/k8s/v1/resource/${resourceType}`;
    url.search = "";
    return url.toString();
  }, []);

  const websocket = useWebsocket<UpdateEvent<TResourceType>>(path);

  useEffect(() => {
    websocket.send("watch");
  }, [websocket.connectionState]);

  return websocket.useMessage("watch:success");
};