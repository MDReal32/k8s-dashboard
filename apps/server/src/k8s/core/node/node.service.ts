import { Injectable, Logger } from "@nestjs/common";

import { K8sService } from "../../../base/k8s.service";

@Injectable()
export class NodeService extends K8sService {
  constructor() {
    super(new Logger(NodeService.name));
  }

  async getNodeResource() {
    const nodes = await this.catch(this.k8sCoreApi.listNode());
    return nodes.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/api/v1/nodes");
  }
}
