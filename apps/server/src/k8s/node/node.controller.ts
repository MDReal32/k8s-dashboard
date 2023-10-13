import { Controller, Get } from "@nestjs/common";

import { NodeService } from "./node.service";

@Controller(["k8s/v1/namespace/:namespace/resource/node", "k8s/v1/node"])
export class NodeController {
  constructor(private readonly nodeService: NodeService) {}

  @Get()
  getPodResource() {
    return this.nodeService.getNodeResource();
  }
}
