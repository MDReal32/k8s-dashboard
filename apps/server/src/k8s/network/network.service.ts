import { NetworkingV1Api } from "@kubernetes/client-node";
import { Injectable, Logger } from "@nestjs/common";

import { K8sService } from "../../base/k8s.service";

@Injectable()
export class NetworkService extends K8sService {
  constructor(protected readonly logger: Logger = new Logger(NetworkService.name)) {
    super(logger);
  }

  private static _k8sApi: NetworkingV1Api;

  get k8sApi() {
    return NetworkService._k8sApi;
  }

  init() {
    return super.init(() => {
      NetworkService._k8sApi = this._kc.makeApiClient(NetworkingV1Api);
    });
  }
}
