import { AutoscalingV2Api } from "@kubernetes/client-node";
import { Injectable, Logger } from "@nestjs/common";

import { K8sService } from "../../base/k8s.service";

@Injectable()
export class AutoScalingService extends K8sService {
  constructor(protected readonly logger: Logger = new Logger(AutoScalingService.name)) {
    super(logger);
  }

  private static _k8sApi: AutoscalingV2Api;

  get k8sApi() {
    return AutoScalingService._k8sApi;
  }

  init() {
    return super.init(() => {
      AutoScalingService._k8sApi = this.kc.makeApiClient(AutoscalingV2Api);
    });
  }
}
