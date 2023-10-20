import { BatchV1Api } from "@kubernetes/client-node";
import { Injectable, Logger } from "@nestjs/common";

import { K8sService } from "../../base/k8s.service";

@Injectable()
export class BatchService extends K8sService {
  constructor(protected readonly logger: Logger = new Logger(BatchService.name)) {
    super(logger);
  }

  private static _k8sApi: BatchV1Api;

  get k8sApi() {
    return BatchService._k8sApi;
  }

  init() {
    return super.init(() => {
      BatchService._k8sApi = this.kc.makeApiClient(BatchV1Api);
    });
  }
}
