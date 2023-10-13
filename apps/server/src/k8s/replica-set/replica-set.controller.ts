import { Controller, Get, Param, Query } from "@nestjs/common";

import { ReplicaSetService } from "./replica-set.service";

@Controller(["k8s/v1/namespace/:namespace/resource/replica-set", "k8s/v1/replica-set"])
export class ReplicaSetController {
  constructor(private readonly replicaSetService: ReplicaSetService) {}

  @Get()
  getPodResource(
    @Param("namespace")
    namespaceParam: string,
    @Query("namespace")
    namespaceQuery: string
  ) {
    return this.replicaSetService.getReplicaSetResource(namespaceParam || namespaceQuery);
  }
}
