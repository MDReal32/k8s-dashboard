import { CoreV1Api } from "@kubernetes/client-node";
import { Injectable, Logger } from "@nestjs/common";

import { K8sService } from "../../base/k8s.service";

@Injectable()
export class CoreService extends K8sService {
  constructor(protected readonly logger: Logger = new Logger(CoreService.name)) {
    super(logger);
  }

  private static _k8sApi: CoreV1Api;

  get k8sApi() {
    return CoreService._k8sApi;
  }

  init() {
    return super.init(() => {
      CoreService._k8sApi = this.kc.makeApiClient(CoreV1Api);
    });
  }
}
