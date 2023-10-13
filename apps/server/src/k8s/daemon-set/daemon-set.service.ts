import { Injectable, Logger } from "@nestjs/common";

import { K8sService } from "../../base/k8s.service";

@Injectable()
export class DaemonSetService extends K8sService {
  constructor() {
    super(new Logger(DaemonSetService.name));
  }

  async getDaemonSetResource(namespace: string) {
    this.expect(namespace, "namespace");

    if (namespace === "_") {
      return this.allNamespace(this.getDaemonSetResource);
    }

    const deployments = await this.catch(this.k8sAppsApi.listNamespacedDaemonSet(namespace));
    return deployments.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/api/v1/namespaces");
  }
}
