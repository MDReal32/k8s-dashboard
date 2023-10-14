import { Injectable, Logger } from "@nestjs/common";

import { K8sService } from "../../base/k8s.service";

@Injectable()
export class StatefulSetService extends K8sService {
  constructor() {
    super(new Logger(StatefulSetService.name));
  }

  async getStatefulSetResource(namespace: string) {
    this.expect(namespace, "namespace");

    const statefulSets = await this.catch(
      namespace === "_"
        ? this.k8sAppsApi.listStatefulSetForAllNamespaces()
        : this.k8sAppsApi.listNamespacedStatefulSet(namespace)
    );
    return statefulSets.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/apis/apps/v1/statefulsets");
  }
}
