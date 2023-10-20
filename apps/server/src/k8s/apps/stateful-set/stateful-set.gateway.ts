import { WebSocketGateway } from "@nestjs/websockets";

import { BaseK8sGateway } from "../../../base/base-k8s.gateway";
import { StatefulSetService } from "./stateful-set.service";


@WebSocketGateway({ path: "/ws/k8s/v1/resource/stateful-set" })
export class StatefulSetGateway extends BaseK8sGateway {
  constructor(private readonly statefulSetService: StatefulSetService) {
    super(statefulSetService);
  }
}