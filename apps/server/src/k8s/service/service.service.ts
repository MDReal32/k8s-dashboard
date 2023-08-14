import { Injectable } from "@nestjs/common";
import { V1Service } from "@kubernetes/client-node";
import { BaseK8s } from "../../utils/base-k8s";

@Injectable()
export class ServiceService extends BaseK8s {
  async getServiceResource(namespace: string) {
    if (namespace === "_") {
      return this.allNamespace(this.getServiceResource);
    }

    const services = await this.catch(this.k8sApi.listNamespacedService(namespace));

    return this.arrayOf(services.body.items, service => ({
      spec: {
        type: service.spec.type,
        app: service.spec.selector?.app,
        ports: service.spec.ports
      }
    }));
  }
}
