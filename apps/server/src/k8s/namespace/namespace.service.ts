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
    const namespaces = await this.catch(this.k8sApi.listNamespace());
    return namespaces.body.items.map(ns => this.getNamespaceResource(ns));
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

  async getNamespaceResources(namespace: string) {
    const [pods, services] = await Promise.all([
      this.getNamespacePods(namespace),
      this.getNamespaceServices(namespace)
    ]);

    return { pods, services };
  }

  async getNamespacePods(namespace: string): Promise<PodResource[]> {
    if (namespace === "_") {
      return this.allNamespace(this.getNamespacePods);
    }

    const pods = await this.catch(this.k8sApi.listNamespacedPod(namespace));
    return pods.body.items.map(pod => this.podResource(pod));
  }

  async getNamespaceServices(namespace: string): Promise<ServiceResource[]> {
    if (namespace === "_") {
      return this.allNamespace(this.getNamespaceServices);
    }

    const services = await this.catch(this.k8sApi.listNamespacedService(namespace));
    return services.body.items.map(service => this.serviceResource(service));
  }

  private async allNamespace<T extends Resource>(
    method: (namespace: string) => Promise<T[]>
  ): Promise<T[]> {
    const namespaces = await this.getAllNamespaces();
    const namespacedResourcePromises = namespaces.map(ns => method.call(this, ns.metadata.name));
    const namespacedResources = await Promise.all(namespacedResourcePromises);
    return namespacedResources.flat();
  }
}
