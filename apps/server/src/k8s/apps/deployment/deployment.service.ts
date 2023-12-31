import { Injectable, Logger } from "@nestjs/common";

import { ALL_NAMESPACES } from "@k8sd/shared";

import { AppsService } from "../apps.service";

@Injectable()
export class DeploymentService extends AppsService {
  constructor() {
    super(new Logger(DeploymentService.name));
  }

  async getDeploymentResource(namespace: string) {
    const deployments = await this.catch(() =>
      namespace === ALL_NAMESPACES
        ? this.k8sApi.listDeploymentForAllNamespaces()
        : this.k8sApi.listNamespacedDeployment(namespace)
    );
    return deployments.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/apis/apps/v1/deployments");
  }
}
