import { WebSocketGateway } from "@nestjs/websockets";

import { BaseK8sGateway } from "../../../base/base-k8s.gateway";
import { ConfigMapService } from "./config-map.service";


@WebSocketGateway({ path: "/ws/k8s/v1/resource/config-map" })
export class ConfigMapGateway extends BaseK8sGateway {
  constructor(private readonly configMapService: ConfigMapService) {
    super(configMapService);
  }
}