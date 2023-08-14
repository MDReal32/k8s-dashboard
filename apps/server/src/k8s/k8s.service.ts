import { CoreV1Api, KubeConfig } from "@kubernetes/client-node";
import { BadRequestException } from "@nestjs/common";

import { Logger } from "@k8sd/shared";

import { BaseK8s } from "../utils/base-k8s";

export class K8sService extends BaseK8s {
  private readonly _kc: KubeConfig;
  private _k8sApi: CoreV1Api;

  private __retry = 0;
  private __maxRetry = 1e2;

  constructor(protected readonly logger: Logger) {
    super();

    this._kc = new KubeConfig();
    this.makeApiClient();
  }

  get k8sApi(): CoreV1Api {
    return this._k8sApi;
  }

  get kc(): KubeConfig {
    return this._kc;
  }

  catch<T>(promise: Promise<T>): Promise<T> {
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
