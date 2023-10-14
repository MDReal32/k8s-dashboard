import { WebSocketGateway } from "@nestjs/websockets";

import { BaseK8sGateway } from "../../base/base-k8s.gateway";
import { NodeService } from "./node.service";

@WebSocketGateway({ path: "/ws/k8s/v1/resource/node" })
export class NodeGateway extends BaseK8sGateway {
  constructor(private readonly nodeService: NodeService) {
    super(nodeService);
  }
}
