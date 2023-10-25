import { StorageV1Api } from "@kubernetes/client-node";
import { Injectable, Logger, OnModuleInit } from "@nestjs/common";

import { K8sService } from "../../base/k8s.service";

@Injectable()
export class StorageService extends K8sService implements OnModuleInit {
  constructor(protected readonly logger: Logger = new Logger(StorageService.name)) {
    super(logger);
  }

  private _k8sApi: StorageV1Api;

  get k8sApi() {
    return this._k8sApi;
  }

  onModuleInit() {
    return super.init(() => {
      this._k8sApi = this.kc.makeApiClient(StorageV1Api);
    });
  }
}
