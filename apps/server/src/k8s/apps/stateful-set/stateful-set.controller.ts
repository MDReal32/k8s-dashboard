import { Controller, Get } from "@nestjs/common";

import { ResourceTypes } from "@k8sd/shared";

import { Namespace } from "../../../decorators/namespace.decorator";
import { StatefulSetService } from "./stateful-set.service";


@Controller([
  `k8s/v1/${ResourceTypes.NAMESPACE}/:namespace/resource/${ResourceTypes.STATEFUL_SET}`,
  `k8s/v1/${ResourceTypes.STATEFUL_SET}`
])
export class StatefulSetController {
  constructor(private readonly statefulSetService: StatefulSetService) {}

  @Get()
  getStatefulSetResource(@Namespace() namespace: string) {
    return this.statefulSetService.getStatefulSetResource(namespace);
  }
}