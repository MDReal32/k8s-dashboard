import { CoreV1Api } from "@kubernetes/client-node";
import { Injectable, Logger, OnModuleInit } from "@nestjs/common";

import { K8sService } from "../../base/k8s.service";

@Injectable()
export class CoreService extends K8sService implements OnModuleInit {
  constructor(protected readonly logger: Logger = new Logger(CoreService.name)) {
    super(logger);
  }

  private _k8sApi: CoreV1Api;

  get k8sApi() {
    return this._k8sApi;
  }

  onModuleInit() {
    return super.init(() => {
      this._k8sApi = this.kc.makeApiClient(CoreV1Api);
    });
  }
}
