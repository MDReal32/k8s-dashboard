import { WebSocket } from "ws";

import { KubeConfig, Watch } from "@kubernetes/client-node";
import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";

import { WS_EVENTS } from "@k8sd/shared";

import { BaseService } from "./base.service";

@Injectable()
export class K8sService extends BaseService {
  private __retry = 0;
  private __maxRetry = 1e2;
  private __watchers = new Set<WebSocket>();
  private readonly __watcher: Watch;
  private readonly _kc: KubeConfig;

  constructor(protected readonly logger: Logger) {
    super();
    this._kc = new KubeConfig();
    this.__watcher = new Watch(this._kc);
  }

  get kc() {
    return this._kc;
  }

  protected get watcher() {
    return this.__watcher;
  }

  protected get watchers() {
    return this.__watchers;
  }

  watch(client: WebSocket) {
    if (this.watchers.has(client)) {
      this.broadcast(client, WS_EVENTS.K8S.WATCH_EXCEPTION, new WsException("Already watching"));
      return;
    }
    this.watchers.add(client);
  }

  unwatch(client: WebSocket) {
    if (!this.watchers.has(client)) {
      this.broadcast(
        client,
        WS_EVENTS.K8S.UNWATCH_EXCEPTION,
        new WsException("Client isn't watching")
      );
      return;
    }
    this.watchers.delete(client);
  }

  protected async k8sWatcher(path: string) {
    await this.watcher.watch(
      path,
      {},
      (type, resource) => {
        this.watchers.forEach(client => {
          this.broadcast(client, WS_EVENTS.K8S.WATCH_SUCCESS, { type, resource });
        });
      },
      err => {
        this.watchers.forEach(client => {
          this.broadcast(client, WS_EVENTS.K8S.WATCH_EXCEPTION, { err });
        });
      }
    );
  }

  protected catch<T>(promise: () => Promise<T>): Promise<T> {
    try {
      return promise();
    } catch (error) {
      if (["EHOSTUNREACH"].includes(error.code)) {
        this.__retry = 0;
        return this.init().then(promise);
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

  protected async init(fn?: () => Promisable<void>) {
    try {
      this._kc.loadFromDefault();
      await fn?.();
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

      return this.init(fn);
    }

    await this.k8sWatch();
  }

  async k8sWatch() {}
}
