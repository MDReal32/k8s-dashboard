import { WebSocketGateway } from "@nestjs/websockets";

import { BaseK8sGateway } from "../../base/base-k8s.gateway";
import { RoleService } from "./role.service";

@WebSocketGateway({ path: "/ws/k8s/v1/resource/role" })
export class RoleGateway extends BaseK8sGateway {
  constructor(private readonly roleService: RoleService) {
    super(roleService);
  }
}
