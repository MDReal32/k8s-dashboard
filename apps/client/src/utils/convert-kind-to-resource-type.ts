import { K8sResource } from "../types";

export const convertKindToResourceType = (kind?: string) =>
  kind?.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase() as K8sResource;
