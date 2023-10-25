import { WebSocketGateway } from "@nestjs/websockets";

import { K8sGateway } from "../../../base/k8s.gateway";
import { DaemonSetService } from "./daemon-set.service";


@WebSocketGateway({ path: "/ws/k8s/v1/resource/daemon-set" })
export class DaemonSetGateway extends K8sGateway {
  constructor(private readonly daemonSetService: DaemonSetService) {
    super(daemonSetService);
  }
}