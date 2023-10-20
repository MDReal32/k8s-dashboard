import { WebSocketGateway } from "@nestjs/websockets";

import { K8sGateway } from "../../../base/k8s.gateway";
import { ClusterRoleBindingService } from "./cluster-role-binding.service";

@WebSocketGateway({ path: "/ws/k8s/v1/resource/cluster-role-binding" })
export class ClusterRoleBindingGateway extends K8sGateway {
  constructor(private readonly clusterRoleBindingService: ClusterRoleBindingService) {
    super(clusterRoleBindingService);
  }
}
