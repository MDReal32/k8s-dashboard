import { WebSocketGateway } from "@nestjs/websockets";

import { BaseK8sGateway } from "../../base/base-k8s.gateway";
import { RoleBindingService } from "./role-binding.service";

@WebSocketGateway({ path: "/ws/k8s/v1/resource/role-binding" })
export class RoleBindingGateway extends BaseK8sGateway {
  constructor(private readonly roleBindingService: RoleBindingService) {
    super(roleBindingService);
  }
}
