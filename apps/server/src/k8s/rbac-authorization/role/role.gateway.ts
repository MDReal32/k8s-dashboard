import { WebSocketGateway } from "@nestjs/websockets";

import { K8sGateway } from "../../../base/k8s.gateway";
import { RoleService } from "./role.service";

@WebSocketGateway({ path: "/ws/k8s/v1/resource/role" })
export class RoleGateway extends K8sGateway {
  constructor(private readonly roleService: RoleService) {
    super(roleService);
  }
}
