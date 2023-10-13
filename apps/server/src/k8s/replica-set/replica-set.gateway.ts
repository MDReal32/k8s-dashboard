import { WebSocketGateway } from "@nestjs/websockets";

import { BaseK8sGateway } from "../../base/base-k8s.gateway";
import { ReplicaSetService } from "./replica-set.service";

@WebSocketGateway({ path: "/api/v1/ws/replica-set" })
export class ReplicaSetGateway extends BaseK8sGateway {
  constructor(private readonly replicaSetService: ReplicaSetService) {
    super(replicaSetService);
  }
}
