import { Injectable, Logger } from "@nestjs/common";

import { K8sService } from "../../base/k8s.service";
import { PodService } from "../pod/pod.service";

@Injectable()
export class DeploymentService extends K8sService {
  constructor() {
    super(new Logger(DeploymentService.name));
  }

  async getDeploymentResource(namespace: string) {
    this.expect(namespace, "namespace");

    if (namespace === "_") {
      return this.allNamespace(this.getDeploymentResource);
    }

    const deployments = await this.catch(this.k8sAppsApi.listNamespacedDeployment(namespace));
    return deployments.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/apis/apps/v1/deployments");
  }
}
