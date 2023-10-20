import { WebSocketGateway } from "@nestjs/websockets";

import { K8sGateway } from "../../../base/k8s.gateway";
import { ReplicaSetService } from "./replica-set.service";

@WebSocketGateway({ path: "/ws/k8s/v1/resource/replica-set" })
export class ReplicaSetGateway extends K8sGateway {
  constructor(private readonly replicaSetService: ReplicaSetService) {
    super(replicaSetService);
  }
}
