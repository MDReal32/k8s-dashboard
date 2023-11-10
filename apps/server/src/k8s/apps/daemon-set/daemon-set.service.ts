import { Injectable, Logger } from "@nestjs/common";

import { ALL_NAMESPACES } from "@k8sd/shared";

import { AppsService } from "../apps.service";

@Injectable()
export class DaemonSetService extends AppsService {
  constructor() {
    super(new Logger(DaemonSetService.name));
  }

  async getDaemonSetResource(namespace: string) {
    const daemonSets = await this.catch(() =>
      namespace === ALL_NAMESPACES
        ? this.k8sApi.listDaemonSetForAllNamespaces()
        : this.k8sApi.listNamespacedDaemonSet(namespace)
    );
    return daemonSets.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/apis/apps/v1/daemonsets");
  }
}
