import { Controller, Get } from "@nestjs/common";

import { ResourceTypes } from "@k8sd/shared";

import { Namespace } from "../../../decorators/namespace.decorator";
import { DaemonSetService } from "./daemon-set.service";


@Controller([
  `k8s/v1/${ResourceTypes.NAMESPACE}/:namespace/resource/${ResourceTypes.DAEMON_SET}`,
  `k8s/v1/${ResourceTypes.DAEMON_SET}`
])
export class DaemonSetController {
  constructor(private readonly daemonSetService: DaemonSetService) {}

  @Get()
  getDaemonSetResource(@Namespace() namespace: string) {
    return this.daemonSetService.getDaemonSetResource(namespace);
  }
}