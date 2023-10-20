import { ResourceTypeMap, ResourceTypes } from "@k8sd/shared";

export const getAppName = (node: ResourceTypeMap[ResourceTypes]) =>
  ["app", "k8s-app"].map(key => node.metadata?.labels?.[key]).filter(Boolean)[0];

export const getServiceAppName = (service: ResourceTypeMap[ResourceTypes.SERVICE]) =>
  ["app", "k8s-app"].map(key => service.spec?.selector?.[key]).filter(Boolean)[0] ||
  service.metadata?.name;
