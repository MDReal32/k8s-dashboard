import { Injectable, Logger } from "@nestjs/common";

import { ALL_NAMESPACES } from "@k8sd/shared";

import { BatchService } from "../batch.service";

@Injectable()
export class JobService extends BatchService {
  constructor() {
    super(new Logger(JobService.name));
  }

  async getJobResource(namespace: string) {
    const jobs = await this.catch(() =>
      namespace === ALL_NAMESPACES
        ? this.k8sApi.listJobForAllNamespaces()
        : this.k8sApi.listNamespacedJob(namespace)
    );
    return jobs.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/apis/batch/v1/jobs");
  }
}
