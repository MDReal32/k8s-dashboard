import { Injectable, Logger } from "@nestjs/common";

import { ALL_NAMESPACES } from "@k8sd/shared";

import { CoreService } from "../core.service";

@Injectable()
export class NamespaceService extends CoreService {
  constructor() {
    super(new Logger(NamespaceService.name));
  }

  async getNamespaceResource(namespace: string) {
    this.expect(namespace);

    return namespace === ALL_NAMESPACES
      ? (await this.catch(() => this.k8sApi.listNamespace())).body.items
      : (await this.catch(() => this.k8sApi.readNamespace(namespace))).body;
  }

  k8sWatch() {
    return super.k8sWatcher("/api/v1/namespaces");
  }
}
