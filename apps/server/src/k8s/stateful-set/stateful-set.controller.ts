import { Controller, Get, Param, Query } from "@nestjs/common";

import { StatefulSetService } from "./stateful-set.service";

@Controller(["k8s/v1/namespace/:namespace/resource/stateful-set", "k8s/v1/stateful-set"])
export class StatefulSetController {
  constructor(private readonly statefulSetService: StatefulSetService) {}

  @Get()
  getStatefulSetResource(
    @Param("namespace")
    namespaceParam: string,
    @Query("namespace")
    namespaceQuery: string
  ) {
    return this.statefulSetService.getStatefulSetResource(namespaceParam || namespaceQuery);
  }
}
