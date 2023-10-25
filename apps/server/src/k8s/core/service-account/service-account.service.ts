import { Injectable, Logger } from "@nestjs/common";

import { CoreService } from "../core.service";


@Injectable()
export class ServiceAccountService extends CoreService {
  constructor() {
    super(new Logger(ServiceAccountService.name));
  }

  async getServiceAccountResource(namespace: string) {
    this.expect(namespace, "namespace");

    const serviceAccounts = await this.catch(() =>
      namespace === "_"
        ? this.k8sApi.listServiceAccountForAllNamespaces()
        : this.k8sApi.listNamespacedServiceAccount(namespace)
    );
    return serviceAccounts.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/api/v1/serviceaccounts");
  }
}