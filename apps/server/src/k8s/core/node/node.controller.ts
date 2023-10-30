import { Controller, Get } from "@nestjs/common";

import { ResourceTypes } from "@k8sd/shared";

import { NodeService } from "./node.service";

@Controller([`k8s/v1/${ResourceTypes.NODE}`])
export class NodeController {
  constructor(private readonly nodeService: NodeService) {}

  @Get()
  getNodeResource() {
    return this.nodeService.getNodeResource();
  }
}
