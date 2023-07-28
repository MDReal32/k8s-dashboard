import { Injectable } from "@nestjs/common";

import { K8sService } from "../k8s.service";
import { BaseK8s, PodResource, Resource, ServiceResource } from "../../utils/base-k8s";

@Injectable()
export class NamespaceService extends BaseK8s {
  constructor(private readonly k8sService: K8sService) {
    super();
  }

  async getAllNamespaces() {
    const namespaces = await this.k8sService.k8sApi.listNamespace();
    return namespaces.body.items.map(ns => ({
      id: ns.metadata.uid,
      name: ns.metadata.name,
      version: ns.metadata.resourceVersion
    }));
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
    const namespacedResourcePromises = namespaces.map(ns => method.call(this, ns.name));
    const namespacedResources = await Promise.all(namespacedResourcePromises);
    return namespacedResources.flat();
  }
}