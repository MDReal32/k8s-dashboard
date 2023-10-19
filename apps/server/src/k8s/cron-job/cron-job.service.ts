import { Injectable, Logger } from "@nestjs/common";

import { K8sService } from "../../base/k8s.service";

@Injectable()
export class CronJobService extends K8sService {
  constructor() {
    super(new Logger(CronJobService.name));
  }

  async getCronJobResource(namespace: string) {
    this.expect(namespace, "namespace");

    const cronJobs = await this.catch(
      namespace === "_"
        ? this.k8sBatchApi.listCronJobForAllNamespaces()
        : this.k8sBatchApi.listNamespacedCronJob(namespace)
    );
    return cronJobs.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/apis/batch/v1/cronjobs");
  }
}
