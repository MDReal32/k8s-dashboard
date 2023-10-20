import { AppsV1Api } from "@kubernetes/client-node";
import { Injectable, Logger } from "@nestjs/common";

import { K8sService } from "../../base/k8s.service";


@Injectable()
export class AppsService extends K8sService {
  constructor(protected readonly logger: Logger = new Logger(AppsService.name)) {
    super(logger);
  }

  private static _k8sApi: AppsV1Api;

  get k8sApi() {
    return AppsService._k8sApi;
  }

  init() {
    return super.init(() => {
      AppsService._k8sApi = this._kc.makeApiClient(AppsV1Api);
    });
  }
}