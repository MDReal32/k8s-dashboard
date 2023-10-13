import { Injectable, Logger } from "@nestjs/common";

import { K8sService } from "../../base/k8s.service";

@Injectable()
export class ReplicaSetService extends K8sService {
  constructor() {
    super(new Logger(ReplicaSetService.name));
  }

  async getReplicaSetResource(namespace: string) {
    this.expect(namespace, "namespace");

    if (namespace === "_") {
      return this.allNamespace(this.getReplicaSetResource);
    }

    const replicaSets = await this.catch(this.k8sAppsApi.listNamespacedReplicaSet(namespace));
    return replicaSets.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/api/v1/replica-sets");
  }
}
