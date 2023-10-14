import { Injectable, Logger } from "@nestjs/common";

import { K8sService } from "../../base/k8s.service";

@Injectable()
export class JobService extends K8sService {
  constructor() {
    super(new Logger(JobService.name));
  }

  async getJobResource(namespace: string) {
    this.expect(namespace, "namespace");

    const jobs = await this.catch(
      namespace === "_"
        ? this.k8sBatchApi.listJobForAllNamespaces()
        : this.k8sBatchApi.listNamespacedJob(namespace)
    );
    return jobs.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/apis/batch/v1/jobs");
  }
}
