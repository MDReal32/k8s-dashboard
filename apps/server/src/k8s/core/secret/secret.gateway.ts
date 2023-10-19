import { WebSocketGateway } from "@nestjs/websockets";

import { BaseK8sGateway } from "../../../base/base-k8s.gateway";
import { SecretService } from "./secret.service";

@WebSocketGateway({ path: "/ws/k8s/v1/resource/secret" })
export class SecretGateway extends BaseK8sGateway {
  constructor(private readonly secretService: SecretService) {
    super(secretService);
  }
}
