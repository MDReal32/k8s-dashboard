import { WebSocket } from "ws";

import { Watch } from "@kubernetes/client-node";
import { Injectable, Logger } from "@nestjs/common";

import { K8sService } from "../../base/k8s.service";

@Injectable()
export class NamespaceService extends K8sService {
  constructor() {
    super(new Logger(NamespaceService.name));
  }

  async getNamespace(namespace: string) {
    return namespace === "_"
      ? (await this.catch(this.k8sCoreApi.listNamespace())).body.items
      : (await this.catch(this.k8sCoreApi.readNamespace(namespace))).body;
  }

  k8sWatch() {
    return super.k8sWatcher("/api/v1/namespaces");
  }
}
