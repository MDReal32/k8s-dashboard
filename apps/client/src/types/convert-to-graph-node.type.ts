import { GraphElementBaseAttributes, GraphNode } from "reagraph";

import { ParsableResourceTypes, ResourceTypeMap, ResourceTypes } from "@k8sd/shared";

import { ImmutableId } from "./immutable-id";

type Clustered<TResource> = { cluster: string; resourceType: ResourceTypes } & TResource;
export type GraphNodeType<T> = Omit<GraphNode, "data" | "id"> &
  GraphElementBaseAttributes<Clustered<T>> &
  ImmutableId;

export type ConvertToGraphNode = <TResourceType extends ParsableResourceTypes>(
  resourceType: TResourceType,
  node: ResourceTypeMap[TResourceType]
) => GraphNodeType<ResourceTypeMap[TResourceType]>;
