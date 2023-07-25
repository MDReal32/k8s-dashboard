import { Injectable } from "@nestjs/common";

import { K8sService } from "../k8s.service";
import { BaseK8s } from "../../utils/base-k8s";

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

  async getNamespacePods(namespace: string) {
    const pods = await this.k8sService.k8sApi.listNamespacedPod(namespace);
    return pods.body.items.map(pod => this.podResource(pod));
  }

  async getNamespaceServices(namespace: string) {
    const services = await this.k8sService.k8sApi.listNamespacedService(namespace);
    return services.body.items.map(service => this.serviceResource(service));
  }
}
