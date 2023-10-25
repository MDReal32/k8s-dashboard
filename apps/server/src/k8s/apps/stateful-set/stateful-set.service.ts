import { Injectable, Logger } from "@nestjs/common";

import { AppsService } from "../apps.service";


@Injectable()
export class StatefulSetService extends AppsService {
  constructor() {
    super(new Logger(StatefulSetService.name));
  }

  async getStatefulSetResource(namespace: string) {
    this.expect(namespace, "namespace");

    const statefulSets = await this.catch(() =>
      namespace === "_"
        ? this.k8sApi.listStatefulSetForAllNamespaces()
        : this.k8sApi.listNamespacedStatefulSet(namespace)
    );
    return statefulSets.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/apis/apps/v1/statefulsets");
  }
}