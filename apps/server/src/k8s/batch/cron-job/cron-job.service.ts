import { Injectable, Logger } from "@nestjs/common";

import { BatchService } from "../batch.service";


@Injectable()
export class CronJobService extends BatchService {
  constructor() {
    super(new Logger(CronJobService.name));
  }

  async getCronJobResource(namespace: string) {
    this.expect(namespace, "namespace");

    const cronJobs = await this.catch(() =>
      namespace === "_"
        ? this.k8sApi.listCronJobForAllNamespaces()
        : this.k8sApi.listNamespacedCronJob(namespace)
    );
    return cronJobs.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/apis/batch/v1/cronjobs");
  }
}