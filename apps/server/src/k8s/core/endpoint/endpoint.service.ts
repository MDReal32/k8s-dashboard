import { Injectable, Logger } from "@nestjs/common";

import { CoreService } from "../core.service";

@Injectable()
export class EndpointService extends CoreService {
  constructor() {
    super(new Logger(EndpointService.name));
  }

  async getEndpointResource(namespace: string) {
    this.expect(namespace, "namespace");

    const endpoints = await this.catch(() =>
      namespace === "_"
        ? this.k8sApi.listEndpointsForAllNamespaces()
        : this.k8sApi.listNamespacedEndpoints(namespace)
    );
    return endpoints.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/api/v1/endpoints");
  }
}
