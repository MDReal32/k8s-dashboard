import { Injectable, Logger } from "@nestjs/common";

import { K8sService } from "../../../base/k8s.service";

@Injectable()
export class ConfigMapService extends K8sService {
  constructor() {
    super(new Logger(ConfigMapService.name));
  }

  async getConfigMapResource(namespace: string) {
    this.expect(namespace, "namespace");

    const configMaps = await this.catch(
      namespace === "_"
        ? this.k8sCoreApi.listConfigMapForAllNamespaces()
        : this.k8sCoreApi.listNamespacedConfigMap(namespace)
    );
    return configMaps.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/api/v1/configmaps");
  }
}
