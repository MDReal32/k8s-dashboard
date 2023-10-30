import { Injectable, Logger } from "@nestjs/common";

import { CoreService } from "../core.service";

@Injectable()
export class ServiceService extends CoreService {
  constructor() {
    super(new Logger(ServiceService.name));
  }

  async getServiceResource(namespace: string) {
    const services = await this.catch(() =>
      namespace === "_"
        ? this.k8sApi.listServiceForAllNamespaces()
        : this.k8sApi.listNamespacedService(namespace)
    );
    return services.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/api/v1/services");
  }
}
