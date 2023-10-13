import { Injectable, Logger } from "@nestjs/common";

import { K8sService } from "../../base/k8s.service";

@Injectable()
export class PodService extends K8sService {
  constructor() {
    super(new Logger(PodService.name));
  }

  async getPodResource(namespace: string) {
    this.expect(namespace, "namespace");

    if (namespace === "_") {
      return this.allNamespace(this.getPodResource);
    }

    const pods = await this.catch(this.k8sCoreApi.listNamespacedPod(namespace));
    return pods.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/api/v1/pods");
  }
}
