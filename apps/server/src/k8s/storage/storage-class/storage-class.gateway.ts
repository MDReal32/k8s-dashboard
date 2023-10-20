import { WebSocketGateway } from "@nestjs/websockets";

import { K8sGateway } from "../../../base/k8s.gateway";
import { StorageClassService } from "./storage-class.service";

@WebSocketGateway({ path: "/ws/k8s/v1/resource/storage-class" })
export class StorageClassGateway extends K8sGateway {
  constructor(private readonly storageClassService: StorageClassService) {
    super(storageClassService);
  }
}
