import { WebSocketGateway } from "@nestjs/websockets";

import { K8sGateway } from "../../../base/k8s.gateway";
import { RoleBindingService } from "./role-binding.service";

@WebSocketGateway({ path: "/ws/k8s/v1/resource/role-binding" })
export class RoleBindingGateway extends K8sGateway {
  constructor(private readonly roleBindingService: RoleBindingService) {
    super(roleBindingService);
  }
}
