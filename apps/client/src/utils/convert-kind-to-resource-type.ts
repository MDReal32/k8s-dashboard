import { ResourceTypes } from "@k8sd/shared";

export const convertKindToResourceType = (kind?: string) =>
  kind?.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase() as ResourceTypes;
