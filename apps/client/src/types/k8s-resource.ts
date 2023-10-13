import { ResourceTypes } from "./resources";

export type K8sResource = Exclude<ResourceTypes, ResourceTypes.NAMESPACE>;
