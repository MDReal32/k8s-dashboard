import { WebSocketGateway } from "@nestjs/websockets";

import { K8sGateway } from "../../../base/k8s.gateway";
import { NodeService } from "./node.service";

@WebSocketGateway({ path: "/ws/k8s/v1/resource/node" })
export class NodeGateway extends K8sGateway {
  constructor(private readonly nodeService: NodeService) {
    super(nodeService);
  }
}
