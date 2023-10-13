import { WebSocketGateway } from "@nestjs/websockets";

import { BaseK8sGateway } from "../../base/base-k8s.gateway";
import { DeploymentService } from "./deployment.service";

@WebSocketGateway({ path: "/api/v1/ws/deployment" })
export class DeploymentGateway extends BaseK8sGateway {
  constructor(private readonly deploymentService: DeploymentService) {
    super(deploymentService);
  }
}
