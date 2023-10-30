import { Controller, Get, Param, Query } from "@nestjs/common";

import { ResourceTypes } from "@k8sd/shared";

import { Namespace } from "../../../decorators/namespace.decorator";
import { ReplicaSetService } from "./replica-set.service";

@Controller([
  `k8s/v1/${ResourceTypes.NAMESPACE}/:namespace/resource/${ResourceTypes.REPLICA_SET}`,
  `k8s/v1/${ResourceTypes.REPLICA_SET}`
])
export class ReplicaSetController {
  constructor(private readonly replicaSetService: ReplicaSetService) {}

  @Get()
  getReplicaSetResource(@Namespace() namespace: string) {
    return this.replicaSetService.getReplicaSetResource(namespace);
  }
}
