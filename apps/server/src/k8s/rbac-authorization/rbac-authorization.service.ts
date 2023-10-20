import { RbacAuthorizationV1Api } from "@kubernetes/client-node";
import { Injectable, Logger } from "@nestjs/common";

import { K8sService } from "../../base/k8s.service";

@Injectable()
export class RbacAuthorizationService extends K8sService {
  constructor(protected readonly logger: Logger = new Logger(RbacAuthorizationService.name)) {
    super(logger);
  }

  private static _k8sApi: RbacAuthorizationV1Api;

  get k8sApi() {
    return RbacAuthorizationService._k8sApi;
  }

  init() {
    return super.init(() => {
      RbacAuthorizationService._k8sApi = this._kc.makeApiClient(RbacAuthorizationV1Api);
    });
  }
}
