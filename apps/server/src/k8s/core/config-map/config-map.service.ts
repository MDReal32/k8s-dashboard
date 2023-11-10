import { Injectable, Logger } from "@nestjs/common";

import { ALL_NAMESPACES } from "@k8sd/shared";

import { CoreService } from "../core.service";

@Injectable()
export class ConfigMapService extends CoreService {
  constructor() {
    super(new Logger(ConfigMapService.name));
  }

  async getConfigMapResource(namespace: string) {
    const configMaps = await this.catch(() =>
      namespace === ALL_NAMESPACES
        ? this.k8sApi.listConfigMapForAllNamespaces()
        : this.k8sApi.listNamespacedConfigMap(namespace)
    );
    return configMaps.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/api/v1/configmaps");
  }
}
