import { Injectable, Logger } from "@nestjs/common";

import { K8sService } from "../../base/k8s.service";

@Injectable()
export class StatefulSetService extends K8sService {
  constructor() {
    super(new Logger(StatefulSetService.name));
  }

  async getStatefulSetResource(namespace: string) {
    this.expect(namespace, "namespace");

    if (namespace === "_") {
      return this.allNamespace(this.getStatefulSetResource);
    }

    const pods = await this.catch(this.k8sAppsApi.listNamespacedStatefulSet(namespace));
    return pods.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/api/v1/stateful-sets");
  }
}
