import { Injectable, Logger } from "@nestjs/common";

import { K8sService } from "../../base/k8s.service";

@Injectable()
export class ServiceAccountService extends K8sService {
  constructor() {
    super(new Logger(ServiceAccountService.name));
  }

  async getServiceAccountResource(namespace: string) {
    this.expect(namespace, "namespace");

    const serviceAccounts = await this.catch(
      namespace === "_"
        ? this.k8sCoreApi.listServiceAccountForAllNamespaces()
        : this.k8sCoreApi.listNamespacedServiceAccount(namespace)
    );
    return serviceAccounts.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/api/v1/serviceaccounts");
  }
}
