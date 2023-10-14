import { Injectable, Logger } from "@nestjs/common";

import { K8sService } from "../../base/k8s.service";

@Injectable()
export class IngressService extends K8sService {
  constructor() {
    super(new Logger(IngressService.name));
  }

  async getIngressResource(namespace: string) {
    this.expect(namespace, "namespace");

    const ingresses = await this.catch(
      namespace === "_"
        ? this.k8sNetworkingApi.listIngressForAllNamespaces()
        : this.k8sNetworkingApi.listNamespacedIngress(namespace)
    );
    return ingresses.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/apis/networking.k8s.io/v1/ingresses");
  }
}
