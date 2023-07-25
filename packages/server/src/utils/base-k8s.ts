import { execSync } from "node:child_process";
import {
  V1ConfigMap,
  V1Deployment,
  V1Ingress,
  V1Pod,
  V1Secret,
  V1Service,
  V1StatefulSet
} from "@kubernetes/client-node";
import { merge } from "lodash";

export type Resource =
  | V1Pod
  | V1Service
  | V1Deployment
  | V1StatefulSet
  | V1Ingress
  | V1ConfigMap
  | V1Secret;

interface BaseMetadata {
  metadata: {
    id: string;
    name: string;
    version: string;
    namespace: string;
    app: string;
    labels: { [p: string]: string };
    annotations: { [p: string]: string };
  };
}

export class BaseK8s {
  protected podResource(pod: V1Pod) {
    return this.baseResource(pod, {
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
    });
  }

  protected serviceResource(service: V1Service) {
    return this.baseResource(service, {
      spec: {
        type: service.spec.type,
        app: service.spec.selector?.app,
        ports: service.spec.ports
      }
    });
  }

  private baseResource<T extends Resource, P extends object>(resource: T, partial?: P) {
    return merge(this.baseMetadata(resource), partial);
  }

  private baseMetadata<T extends Resource>(resource: T): BaseMetadata {
    return {
      metadata: {
        id: resource.metadata.uid,
        name: resource.metadata.name,
        version: resource.metadata.resourceVersion,
        namespace: resource.metadata.namespace,
        app: resource.metadata.labels.app,
        labels: resource.metadata.labels,
        annotations: resource.metadata.annotations
      }
    };
  }

  private getNode(nodeName: string) {
    switch (nodeName) {
      case "minikube":
        return `${nodeName}/${this.minikubeIp()}`;
      default:
        return nodeName;
    }
  }

  private minikubeIp() {
    return execSync("minikube ip").toString().trim();
  }
}
