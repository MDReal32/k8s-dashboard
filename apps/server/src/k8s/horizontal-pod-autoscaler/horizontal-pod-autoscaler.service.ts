import { Injectable, Logger } from "@nestjs/common";

import { K8sService } from "../../base/k8s.service";

@Injectable()
export class HorizontalPodAutoscalerService extends K8sService {
  constructor() {
    super(new Logger(HorizontalPodAutoscalerService.name));
  }

  async getHorizontalPodAutoscalerResource(namespace: string) {
    this.expect(namespace, "namespace");

    const horizontalPodAutoscalers = await this.catch(
      namespace === "_"
        ? this.k8sAutoScalingApi.listHorizontalPodAutoscalerForAllNamespaces()
        : this.k8sAutoScalingApi.listNamespacedHorizontalPodAutoscaler(namespace)
    );
    return horizontalPodAutoscalers.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/apis/autoscaling/v2/horizontalpodautoscalers");
  }
}
