import { Injectable } from "@nestjs/common";
import { V1Pod } from "@kubernetes/client-node";

import { BaseK8s } from "../../utils/base-k8s";

@Injectable()
export class PodService extends BaseK8s {
  async getPodResource(namespace: string) {
    this.expect(namespace, "namespace");

    if (namespace === "_") {
      return this.allNamespace(this.getPodResource);
    }

    const pods = await this.catch(this.k8sCoreApi.listNamespacedPod(namespace));
    return this.arrayOf(pods.body.items, this.getPod.bind(this));
  }

  getPod(pod: V1Pod) {
    return {
      metadata: {
        owners: pod.metadata.ownerReferences?.map(owner => ({
          id: owner.uid,
          name: owner.name,
          kind: owner.kind
        }))
      },
      spec: {
        node: this.getNode(pod.spec.nodeName),
        containers: this.getContainers(pod.spec.containers),
        volumes: this.getVolumes(pod.spec.volumes),
        secrets: this.getSecrets(pod.spec.imagePullSecrets),
        restart: {
          policy: pod.spec.restartPolicy
        },
        service: {
          account: {
            name: pod.spec.serviceAccountName
          }
        }
      }
    };
  }

  private getNode(nodeName: string) {
    return `${nodeName}/${this.getIpAddress(nodeName)}`;
  }
}
