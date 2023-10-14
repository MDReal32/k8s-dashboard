import { Injectable, Logger } from "@nestjs/common";

import { K8sService } from "../../base/k8s.service";

@Injectable()
export class JobService extends K8sService {
  constructor() {
    super(new Logger(JobService.name));
  }

  async getJobResource(namespace: string) {
    this.expect(namespace, "namespace");

    if (namespace === "_") {
      return this.allNamespace(this.getJobResource);
    }

    const pods = await this.catch(this.k8sCoreApi.listNamespacedPod(namespace));
    return pods.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/apis/batch/v1/jobs");
  }
}
