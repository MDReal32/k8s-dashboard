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
      metadata: {
        owners: pod.metadata.ownerReferences?.map(owner => ({
          id: owner.uid,
          name: owner.name,
          kind: owner.kind
        }))
      },
      spec: {
        node: this.getNode(pod.spec.nodeName),
        containers: pod.spec.containers?.map(container => ({
          image: {
            name: container.image,
            pullPolicy: container.imagePullPolicy
          },
          ports: container.ports,
          resource: container.resources,
          volume: {
            mounts: container.volumeMounts,
            devices: container.volumeDevices
          }
        })),
        volumes: pod.spec.volumes?.map(volume => ({
          name: volume.name,
          sources: volume.projected?.sources
        })),
        secrets: pod.spec.imagePullSecrets?.map(secret => secret.name),
        restart: {
          policy: pod.spec.restartPolicy
        },
        service: {
          account: {
            name: pod.spec.serviceAccountName
          }
        }
      }
    }));
  }

  private getNode(nodeName: string) {
    return `${nodeName}/${this.getIpAddress(nodeName)}`;
  }
}
