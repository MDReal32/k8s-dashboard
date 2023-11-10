import { Injectable, Logger } from "@nestjs/common";

import { ALL_NAMESPACES } from "@k8sd/shared";

import { NetworkService } from "../network.service";

@Injectable()
export class IngressService extends NetworkService {
  constructor() {
    super(new Logger(IngressService.name));
  }

  async getIngressResource(namespace: string) {
    const ingresses = await this.catch(() =>
      namespace === ALL_NAMESPACES
        ? this.k8sApi.listIngressForAllNamespaces()
        : this.k8sApi.listNamespacedIngress(namespace)
    );
    return ingresses.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/apis/networking.k8s.io/v1/ingresses");
  }
}
