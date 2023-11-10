import { Injectable, Logger } from "@nestjs/common";

import { ALL_NAMESPACES } from "@k8sd/shared";

import { CoreService } from "../core.service";

@Injectable()
export class PodService extends CoreService {
  constructor() {
    super(new Logger(PodService.name));
  }

  async getPodResource(namespace: string) {
    const pods = await this.catch(() =>
      namespace === ALL_NAMESPACES
        ? this.k8sApi.listPodForAllNamespaces()
        : this.k8sApi.listNamespacedPod(namespace)
    );
    return pods.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/api/v1/pods");
  }
}
