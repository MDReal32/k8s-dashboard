import { Injectable, Logger } from "@nestjs/common";

import { ALL_NAMESPACES } from "@k8sd/shared";

import { AppsService } from "../apps.service";

@Injectable()
export class ReplicaSetService extends AppsService {
  constructor() {
    super(new Logger(ReplicaSetService.name));
  }

  async getReplicaSetResource(namespace: string) {
    const replicaSets = await this.catch(() =>
      namespace === ALL_NAMESPACES
        ? this.k8sApi.listReplicaSetForAllNamespaces()
        : this.k8sApi.listNamespacedReplicaSet(namespace)
    );
    return replicaSets.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/apis/apps/v1/replicasets");
  }
}
