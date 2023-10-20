import { WebSocketGateway } from "@nestjs/websockets";

import { K8sGateway } from "../../../base/k8s.gateway";
import { DeploymentService } from "./deployment.service";

@WebSocketGateway({ path: "/ws/k8s/v1/resource/deployment" })
export class DeploymentGateway extends K8sGateway {
  constructor(private readonly deploymentService: DeploymentService) {
    super(deploymentService);
  }
}
