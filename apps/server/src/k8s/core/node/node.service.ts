import { Injectable, Logger } from "@nestjs/common";

import { CoreService } from "../core.service";

@Injectable()
export class NodeService extends CoreService {
  constructor() {
    super(new Logger(NodeService.name));
  }

  async getNodeResource() {
    const nodes = await this.catch(() => this.k8sApi.listNode());
    return nodes.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/api/v1/nodes");
  }
}
