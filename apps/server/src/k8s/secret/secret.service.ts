import { Injectable, Logger } from "@nestjs/common";

import { K8sService } from "../../base/k8s.service";

@Injectable()
export class SecretService extends K8sService {
  constructor() {
    super(new Logger(SecretService.name));
  }

  async getSecretResource(namespace: string) {
    this.expect(namespace, "namespace");

    const secrets = await this.catch(
      namespace === "_"
        ? this.k8sCoreApi.listSecretForAllNamespaces()
        : this.k8sCoreApi.listNamespacedSecret(namespace)
    );
    return secrets.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/api/v1/secrets");
  }
}
