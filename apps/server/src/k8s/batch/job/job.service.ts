import { Injectable, Logger } from "@nestjs/common";

import { BatchService } from "../batch.service";

@Injectable()
export class JobService extends BatchService {
  constructor() {
    super(new Logger(JobService.name));
  }

  async getJobResource(namespace: string) {
    this.expect(namespace, "namespace");

    const jobs = await this.catch(() =>
      namespace === "_"
        ? this.k8sApi.listJobForAllNamespaces()
        : this.k8sApi.listNamespacedJob(namespace)
    );
    return jobs.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/apis/batch/v1/jobs");
  }
}
