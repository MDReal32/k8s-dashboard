import { execSync } from "node:child_process";
import {
  CoreV1Api,
  KubeConfig,
  V1ConfigMap,
  V1Deployment,
  V1Ingress,
  V1Namespace,
  V1Pod,
  V1Secret,
  V1Service,
  V1StatefulSet
} from "@kubernetes/client-node";
import { merge } from "lodash";
import { BadRequestException } from "@nestjs/common";

import { Logger } from "@k8sd/shared";

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
  private readonly _kc: KubeConfig;
  private __retry = 0;
  private __maxRetry = 1e2;

  constructor(protected readonly logger: Logger) {
    this._kc = new KubeConfig();
    this.makeApiClient();
  }

  private _k8sApi: CoreV1Api;

  get k8sApi(): CoreV1Api {
    return this._k8sApi;
  }

  get kc(): KubeConfig {
    return this._kc;
  }

  protected async getAllNamespaces() {
    const namespaces = await this.catch(this.k8sApi.listNamespace());
    return namespaces.body.items.map(ns => this.getNamespaceResource(ns));
  }

  protected async allNamespace<T extends Resource>(
    method: (namespace: string) => Promise<T[]> | T[]
  ): Promise<T[]> {
    const namespaces = await this.getAllNamespaces();
    const namespacedResourcePromises = namespaces.map(ns => method.call(this, ns.metadata.name));
    const namespacedResources = await Promise.all(namespacedResourcePromises);
    return namespacedResources.flat();
  }

  protected getNamespaceResource(ns: V1Namespace) {
    return this.baseResource(ns);
  }

  protected catch<T>(promise: Promise<T>): Promise<T> {
    return promise.catch(error => {
      if (["EHOSTUNREACH"].includes(error.code)) {
        this.__retry = 0;
        this.makeApiClient();
        return promise;
      }

      this.logger.error(error);
      throw error;
    });
  }

  protected expect<T>(value: T | undefined, field?: string) {
    const message = `Expected ${field ?? "value"} to be defined`;

    if (value === undefined) {
      throw new BadRequestException(message);
    }

    return value;
  }

  protected arrayOf<Value, PartialSection extends object>(
    resources: Value | Value[],
    partialSection?: (value: Value) => PartialSection
  ) {
    return Array.isArray(resources)
      ? resources.map(res => this.baseResource(res, partialSection(res)))
      : [this.baseResource(resources, partialSection(resources))];
  }

  protected getIpAddress(nodeName: string) {
    switch (nodeName) {
      case "minikube":
        return execSync("minikube ip").toString().trim();
      default:
        return nodeName;
    }
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

  private makeApiClient() {
    try {
      this._kc.loadFromDefault();
      this._k8sApi = this._kc.makeApiClient(CoreV1Api);
    } catch (error) {
      if (this.__retry === 0) this.logger.log("Kubernetes API isn't available. Retrying...");
      else this.logger.log(`Retrying ${this.__retry}/${this.__maxRetry}...`);

      this.__retry++;

      let startTime = performance.now();
      while (performance.now() - startTime < 1000) {}
      if (this.__retry > this.__maxRetry) {
        this.logger.error(error);
        throw new BadRequestException("Kubernetes API isn't available", { cause: error });
      }

      return this.makeApiClient();
    }
  }
}
