import { Injectable } from "@nestjs/common";

import { Logger } from "@k8sd/shared";

import { K8sService } from "../k8s.service";
import { CreateNamespaceDto } from "./dto/create-namespace.dto";
import { PodResource, Resource, ServiceResource } from "../../utils/base-k8s";

@Injectable()
export class NamespaceService extends K8sService {
  constructor() {
    super(new Logger("NamespaceService"));
  }

  async getAllNamespaces() {
    return super.getAllNamespaces();
  }

  async getNamespace(namespace: string) {
    const ns = await this.catch(this.k8sApi.readNamespace(namespace));
    return this.getNamespaceResource(ns.body);
  }

  async createNamespace(data: CreateNamespaceDto) {
    const ns = await this.catch(this.k8sApi.createNamespace({ metadata: { name: data.name } }));
    return this.getNamespaceResource(ns.body);
  }

  async deleteNamespace(namespace: string) {
    await this.catch(this.k8sApi.deleteNamespace(namespace));
    return { message: `Namespace ${namespace} deleted` };
  }
}
