import { ParsableResourceTypes, ResourceTypeMap } from "@k8sd/shared";

export const getAppName = (node: ResourceTypeMap[ParsableResourceTypes]) =>
  ["app", "k8s-app"].map(key => node.metadata?.labels?.[key]).filter(Boolean)[0];
