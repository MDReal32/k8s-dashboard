import { WebSocketGateway } from "@nestjs/websockets";

import { K8sGateway } from "../../../base/k8s.gateway";
import { StatefulSetService } from "./stateful-set.service";


@WebSocketGateway({ path: "/ws/k8s/v1/resource/stateful-set" })
export class StatefulSetGateway extends K8sGateway {
  constructor(private readonly statefulSetService: StatefulSetService) {
    super(statefulSetService);
  }
}