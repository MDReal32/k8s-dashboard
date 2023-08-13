import { BadRequestException, Injectable } from "@nestjs/common";

import { K8sService } from "../k8s.service";
import { BaseK8s, PodResource, Resource, ServiceResource } from "../../utils/base-k8s";
import { CreateNamespaceDto } from "./dto/create-namespace.dto";

@Injectable()
export class NamespaceService extends BaseK8s {
  constructor(private readonly k8sService: K8sService) {
    super();
  }

  async getAllNamespaces() {
    const namespaces = await this.k8sService.k8sApi.listNamespace();
    return namespaces.body.items.map(ns => this.getNamespaceResource(ns));
  }

  async getNamespace(namespace: string) {
    try {
      const ns = await this.k8sService.k8sApi.readNamespace(namespace);
      return this.getNamespaceResource(ns.body);
    } catch (e) {
      throw new BadRequestException(`Namespace ${namespace} not found`, { cause: e });
    }
  }

  async createNamespace(data: CreateNamespaceDto) {
    try {
      const ns = await this.k8sService.k8sApi.createNamespace({ metadata: { name: data.name } });
      return this.getNamespaceResource(ns.body);
    } catch (e) {
      throw new BadRequestException(`Namespace ${data.name} already exists`, { cause: e });
    }
  }

  async deleteNamespace(namespace: string) {
    try {
      await this.k8sService.k8sApi.deleteNamespace(namespace);
      return { message: `Namespace ${namespace} deleted` };
    } catch (e) {
      throw new BadRequestException(`Namespace ${namespace} not found`, { cause: e });
    }
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

    const pods = await this.k8sService.k8sApi.listNamespacedPod(namespace);
    return pods.body.items.map(pod => this.podResource(pod));
  }

  async getNamespaceServices(namespace: string): Promise<ServiceResource[]> {
    if (namespace === "_") {
      return this.allNamespace(this.getNamespaceServices);
    }

    const services = await this.k8sService.k8sApi.listNamespacedService(namespace);
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
