import { Injectable, Logger } from "@nestjs/common";

import { K8sService } from "../../base/k8s.service";

@Injectable()
export class ServiceService extends K8sService {
  constructor() {
    super(new Logger(ServiceService.name));
  }

  async getServiceResource(namespace: string) {
    if (namespace === "_") {
      return this.allNamespace(this.getServiceResource);
    }

    const services = await this.catch(this.k8sCoreApi.listNamespacedService(namespace));
    return services.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/api/v1/services");
  }
}
