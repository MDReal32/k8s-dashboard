import { Injectable, Logger } from "@nestjs/common";

import { AutoScalingService } from "../auto-scaling.service";

@Injectable()
export class HorizontalPodAutoscalerService extends AutoScalingService {
  constructor() {
    super(new Logger(HorizontalPodAutoscalerService.name));
  }

  async getHorizontalPodAutoscalerResource(namespace: string) {
    this.expect(namespace, "namespace");

    const horizontalPodAutoscalers = await this.catch(
      namespace === "_"
        ? this.k8sApi.listHorizontalPodAutoscalerForAllNamespaces()
        : this.k8sApi.listNamespacedHorizontalPodAutoscaler(namespace)
    );
    return horizontalPodAutoscalers.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/apis/autoscaling/v2/horizontalpodautoscalers");
  }
}
