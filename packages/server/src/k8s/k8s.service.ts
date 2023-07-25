import { Injectable } from "@nestjs/common";
import { CoreV1Api, KubeConfig } from "@kubernetes/client-node";

@Injectable()
export class K8sService {
  private readonly _kc: KubeConfig;
  private readonly _k8sApi: CoreV1Api;

  constructor() {
    this._kc = new KubeConfig();
    this._kc.loadFromDefault();
    this._k8sApi = this._kc.makeApiClient(CoreV1Api);
  }

  get k8sApi(): CoreV1Api {
    return this._k8sApi;
  }

  get kc(): KubeConfig {
    return this._kc;
  }
}
