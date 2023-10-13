import { WebSocket } from "ws";

import { AppsV1Api, CoreV1Api, KubeConfig, NetworkingV1Api, Watch } from "@kubernetes/client-node";
import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";

import { BaseService } from "./base.service";

@Injectable()
export class K8sService extends BaseService {
  private readonly _kc: KubeConfig;
  private __retry = 0;
  private __maxRetry = 1e2;
  private __watchers = new Set<WebSocket>();
  private readonly __watcher: Watch;

  constructor(protected readonly logger: Logger) {
    super();
    this._kc = new KubeConfig();
    this.makeApiClient();
    this.__watcher = new Watch(this._kc);

    this.k8sWatch().then();
  }

  private _k8sCoreApi: CoreV1Api;

  get k8sCoreApi() {
    return this._k8sCoreApi;
  }

  private _k8sAppsApi: AppsV1Api;

  get k8sAppsApi() {
    return this._k8sAppsApi;
  }

  private _k8sNetworkingApi: NetworkingV1Api;

  get k8sNetworkingApi() {
    return this._k8sNetworkingApi;
  }

  protected get watcher() {
    return this.__watcher;
  }

  protected get watchers() {
    return this.__watchers;
  }

  watch(client: WebSocket) {
    if (this.watchers.has(client)) {
      this.broadcast(client, "watch:exception", new WsException("Already watching"));
      return;
    }
    this.watchers.add(client);
  }

  unwatch(client: WebSocket) {
    if (!this.watchers.has(client)) {
      this.broadcast(client, "watch:exception", new WsException("Client isn't watching"));
      return;
    }
    this.watchers.delete(client);
  }

  async k8sWatch() {
    throw new Error("Method not implemented.");
  }

  protected async k8sWatcher(path: string) {
    await this.watcher.watch(
      path,
      {},
      (type, apiObj) => {
        this.watchers.forEach(client => {
          client.send(JSON.stringify({ event: "watch:success", data: { type, apiObj } }));
        });
      },
      err => {
        this.watchers.forEach(client => {
          client.send(JSON.stringify({ event: "watch:error", data: { err } }));
        });
      }
    );
  }

  protected async getAllNamespaces() {
    const namespaces = await this.catch(this.k8sCoreApi.listNamespace());
    return namespaces.body.items;
  }

  protected async allNamespace<T>(method: (namespace: string) => Promise<T[]> | T[]): Promise<T[]> {
    const namespaces = await this.getAllNamespaces();
    const namespacedResourcePromises = namespaces.map(ns => method.call(this, ns.metadata.name));
    const namespacedResources = await Promise.all(namespacedResourcePromises);
    return namespacedResources.flat();
  }

  protected catch<T>(promise: Promise<T>): Promise<T> {
    try {
      return promise;
    } catch (error) {
      if (["EHOSTUNREACH"].includes(error.code)) {
        this.__retry = 0;
        this.makeApiClient();
        return promise;
      }

      this.logger.error(error);
      throw error;
    }
  }

  protected expect<T>(value: T | undefined, field?: string) {
    const message = `Expected ${field ?? "value"} to be defined`;

    if (value === undefined) {
      throw new BadRequestException(message);
    }

    return value;
  }

  private makeApiClient() {
    try {
      this._kc.loadFromDefault();
      this._k8sCoreApi = this._kc.makeApiClient(CoreV1Api);
      this._k8sAppsApi = this._kc.makeApiClient(AppsV1Api);
      this._k8sNetworkingApi = this._kc.makeApiClient(NetworkingV1Api);
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
