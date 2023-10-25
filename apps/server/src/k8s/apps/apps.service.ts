import { AppsV1Api } from "@kubernetes/client-node";
import { Injectable, Logger, OnModuleInit } from "@nestjs/common";

import { K8sService } from "../../base/k8s.service";

@Injectable()
export class AppsService extends K8sService implements OnModuleInit {
  constructor(protected readonly logger: Logger = new Logger(AppsService.name)) {
    super(logger);
  }

  private _k8sApi: AppsV1Api;

  get k8sApi() {
    return this._k8sApi;
  }

  onModuleInit() {
    return super.init(() => {
      this._k8sApi = this.kc.makeApiClient(AppsV1Api);
    });
  }
}
