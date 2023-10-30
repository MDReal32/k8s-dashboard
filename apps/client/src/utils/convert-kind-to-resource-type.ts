import { ResourceTypes } from "@k8sd/shared";

export const convertKindToResourceType = <TResourceType extends ResourceTypes>(kind?: string) =>
  kind?.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase() as TResourceType;
