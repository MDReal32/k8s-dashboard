import { GraphEdge } from "reagraph";

import { ParsableResourceTypes, ResourceTypeMap } from "@k8sd/shared";

import { ImmutableId } from "./immutable-id";

export type ConvertToGraphEdge = (
  source: ResourceTypeMap[ParsableResourceTypes],
  target: ResourceTypeMap[ParsableResourceTypes]
) => Omit<GraphEdge, "id"> & ImmutableId;
