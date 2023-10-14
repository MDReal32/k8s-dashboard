import { Injectable, Logger } from "@nestjs/common";

import { K8sService } from "../../base/k8s.service";

@Injectable()
export class DaemonSetService extends K8sService {
  constructor() {
    super(new Logger(DaemonSetService.name));
  }

  async getDaemonSetResource(namespace: string) {
    this.expect(namespace, "namespace");

    const daemonSets = await this.catch(
      namespace === "_"
        ? this.k8sAppsApi.listDaemonSetForAllNamespaces()
        : this.k8sAppsApi.listNamespacedDaemonSet(namespace)
    );
    return daemonSets.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/apis/apps/v1/daemonsets");
  }
}
