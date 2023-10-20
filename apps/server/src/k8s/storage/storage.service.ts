import { StorageV1Api } from "@kubernetes/client-node";
import { Injectable, Logger } from "@nestjs/common";

import { K8sService } from "../../base/k8s.service";

@Injectable()
export class StorageService extends K8sService {
  constructor(protected readonly logger: Logger = new Logger(StorageService.name)) {
    super(logger);
  }

  private static _k8sApi: StorageV1Api;

  get k8sApi() {
    return StorageService._k8sApi;
  }

  init() {
    return super.init(() => {
      StorageService._k8sApi = this._kc.makeApiClient(StorageV1Api);
    });
  }
}
