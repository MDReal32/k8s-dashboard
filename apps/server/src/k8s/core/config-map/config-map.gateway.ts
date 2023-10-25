import { WebSocketGateway } from "@nestjs/websockets";

import { K8sGateway } from "../../../base/k8s.gateway";
import { ConfigMapService } from "./config-map.service";


@WebSocketGateway({ path: "/ws/k8s/v1/resource/config-map" })
export class ConfigMapGateway extends K8sGateway {
  constructor(private readonly configMapService: ConfigMapService) {
    super(configMapService);
  }
}