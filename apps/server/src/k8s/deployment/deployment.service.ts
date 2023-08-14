import { Injectable } from "@nestjs/common";

import { BaseK8s } from "../../utils/base-k8s";
import { Logger } from "@k8sd/shared";
import { PodService } from "../pod/pod.service";

@Injectable()
export class DeploymentService extends BaseK8s {
  constructor(private readonly podService: PodService) {
    super(new Logger("DeploymentService"));
  }

  async getDeploymentResource(namespace: string) {
    this.expect(namespace, "namespace");

    if (namespace === "_") {
      return this.allNamespace(this.getDeploymentResource);
    }

    const deployments = await this.catch(this.k8sAppsApi.listNamespacedDeployment(namespace));

    try {
      return this.arrayOf(deployments.body.items, deployment => ({
        replicas: deployment.spec.replicas,
        selector: deployment.spec.selector.matchLabels,
        template: this.podService.getPod(deployment.spec.template)
      }));
    } catch (e) {
      console.log(e);
    }
  }
}
