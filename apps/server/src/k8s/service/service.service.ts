import { Injectable, Logger } from "@nestjs/common";

import { K8sService } from "../../base/k8s.service";

@Injectable()
export class ServiceService extends K8sService {
  constructor() {
    super(new Logger(ServiceService.name));
  }

  async getServiceResource(namespace: string) {
    this.expect(namespace, "namespace");

    const services = await this.catch(
      namespace === "_"
        ? this.k8sCoreApi.listServiceForAllNamespaces()
        : this.k8sCoreApi.listNamespacedService(namespace)
    );
    return services.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/api/v1/services");
  }
}
