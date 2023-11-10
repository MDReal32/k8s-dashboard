import { Injectable, Logger } from "@nestjs/common";

import { ALL_NAMESPACES } from "@k8sd/shared";

import { CoreService } from "../core.service";

@Injectable()
export class SecretService extends CoreService {
  constructor() {
    super(new Logger(SecretService.name));
  }

  async getSecretResource(namespace: string) {
    const secrets = await this.catch(() =>
      namespace === ALL_NAMESPACES
        ? this.k8sApi.listSecretForAllNamespaces()
        : this.k8sApi.listNamespacedSecret(namespace)
    );
    return secrets.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/api/v1/secrets");
  }
}
