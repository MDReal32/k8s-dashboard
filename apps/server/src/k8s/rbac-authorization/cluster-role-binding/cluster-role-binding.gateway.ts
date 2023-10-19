import { WebSocketGateway } from "@nestjs/websockets";

import { BaseK8sGateway } from "../../../base/base-k8s.gateway";
import { ClusterRoleBindingService } from "./cluster-role-binding.service";

@WebSocketGateway({ path: "/ws/k8s/v1/resource/cluster-role-binding" })
export class ClusterRoleBindingGateway extends BaseK8sGateway {
  constructor(private readonly clusterRoleBindingService: ClusterRoleBindingService) {
    super(clusterRoleBindingService);
  }
}
