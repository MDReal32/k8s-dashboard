import { Injectable, Logger } from "@nestjs/common";

import { CoreService } from "../core.service";


@Injectable()
export class NamespaceService extends CoreService {
  constructor() {
    super(new Logger(NamespaceService.name));
  }

  async getNamespaceResource(namespace: string) {
    return namespace === "_"
      ? (await this.catch(this.k8sApi.listNamespace())).body.items
      : (await this.catch(this.k8sApi.readNamespace(namespace))).body;
  }

  k8sWatch() {
    return super.k8sWatcher("/api/v1/namespaces");
  }
}