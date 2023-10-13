import { ArrayObject } from "../hooks/use-get-array-object";
import { K8sResource } from "./k8s-resource";
import { ResourceTypeMap } from "./resources";

export type UseAddK8sComponent = <TResourceType extends K8sResource>(allObjects: {
  [TResource in K8sResource]: ArrayObject<ResourceTypeMap[TResource]>;
}) => void;
