import { Injectable, Logger } from "@nestjs/common";

import { AppsService } from "../apps.service";

@Injectable()
export class DaemonSetService extends AppsService {
  constructor() {
    super(new Logger(DaemonSetService.name));
  }

  async getDaemonSetResource(namespace: string) {
    this.expect(namespace, "namespace");

    const daemonSets = await this.catch(
      namespace === "_"
        ? this.k8sApi.listDaemonSetForAllNamespaces()
        : this.k8sApi.listNamespacedDaemonSet(namespace)
    );
    return daemonSets.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/apis/apps/v1/daemonsets");
  }
}
