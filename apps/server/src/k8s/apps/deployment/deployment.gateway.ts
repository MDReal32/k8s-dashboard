import { WebSocketGateway } from "@nestjs/websockets";

import { BaseK8sGateway } from "../../../base/base-k8s.gateway";
import { DeploymentService } from "./deployment.service";


@WebSocketGateway({ path: "/ws/k8s/v1/resource/deployment" })
export class DeploymentGateway extends BaseK8sGateway {
  constructor(private readonly deploymentService: DeploymentService) {
    super(deploymentService);
  }
}