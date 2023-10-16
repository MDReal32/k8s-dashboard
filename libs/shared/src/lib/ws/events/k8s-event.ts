import { actionEvent } from "@k8sd/shared";

export const K8S_EVENTS = {
  ...actionEvent("watch", "k8s::watch", "success", "exception"),
  ...actionEvent("unwatch", "k8s::unwatch", "exception")
};
