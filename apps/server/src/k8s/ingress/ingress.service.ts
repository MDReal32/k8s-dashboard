import { Injectable, Logger } from "@nestjs/common";

import { K8sService } from "../../base/k8s.service";

@Injectable()
export class IngressService extends K8sService {
  constructor() {
    super(new Logger(IngressService.name));
  }

  async getIngressResource(namespace: string) {
    this.expect(namespace, "namespace");

    if (namespace === "_") {
      return this.allNamespace(this.getIngressResource);
    }

    const ingresses = await this.catch(this.k8sNetworkingApi.listNamespacedIngress(namespace));
    return ingresses.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/api/v1/ingresses");
  }
}
