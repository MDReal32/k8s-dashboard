import { WebSocketGateway } from "@nestjs/websockets";

import { BaseK8sGateway } from "../../../base/base-k8s.gateway";
import { DaemonSetService } from "./daemon-set.service";


@WebSocketGateway({ path: "/ws/k8s/v1/resource/daemon-set" })
export class DaemonSetGateway extends BaseK8sGateway {
  constructor(private readonly daemonSetService: DaemonSetService) {
    super(daemonSetService);
  }
}