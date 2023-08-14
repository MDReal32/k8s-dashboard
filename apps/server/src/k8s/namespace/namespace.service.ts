import { Injectable } from "@nestjs/common";

import { Logger } from "@k8sd/shared";

import { CreateNamespaceDto } from "./dto/create-namespace.dto";
import { BaseK8s } from "../../utils/base-k8s";

@Injectable()
export class NamespaceService extends BaseK8s {
  constructor() {
    super(new Logger("NamespaceService"));
  }

  async getAllNamespaces() {
    return super.getAllNamespaces();
  }

  async getNamespace(namespace: string) {
    const ns = await this.catch(this.k8sCoreApi.readNamespace(namespace));
    return this.baseResource(ns.body);
  }

  async createNamespace(data: CreateNamespaceDto) {
    const ns = await this.catch(this.k8sCoreApi.createNamespace({ metadata: { name: data.name } }));
    return this.baseResource(ns.body);
  }

  async deleteNamespace(namespace: string) {
    await this.catch(this.k8sCoreApi.deleteNamespace(namespace));
    return { message: `Namespace ${namespace} deleted` };
  }
}
