import { Observable } from "rxjs";
import { z, ZodType } from "zod";
import { Promisable } from "type-fest";

import { Executor, CORE_APP_NAME, Logger, WS_EVENTS } from "@k8sd/shared";
import { Plugin, fetchPlugins, retrievePlugins } from "@k8sd/plugin-builder";

import { WebsocketClient } from "./utils/websocket-client";
import { Git } from "./core/git";
import { Data } from "./types";
import { Queue } from "./utils/queue";

import * as pkgJson from "../package.json";

export interface WebsocketData<T> {
  data: T;
  headers: object;
  executor: Executor;
  git: Git;
  logger: Logger;
  readonly plugins: Plugin[];
}

export class Core extends Queue {
  private readonly logger = new Logger("Core");
  private pluginNames: string[] = [];
  private plugins: Plugin[] = [];

  constructor(private readonly ws: WebsocketClient) {
    super();
  }

  fetchPlugins() {
    this.pluginNames = retrievePlugins(pkgJson);
    this.add(async () => (this.plugins = await fetchPlugins(this.pluginNames)));
    return this.continue();
  }

  prepare() {
    this.ws.connect();

    this.ws.on(["connection", "reconnect"], () => {
      this.ws.emit(WS_EVENTS.INTRODUCE, CORE_APP_NAME);
    });

    this.add(() => {
      return new Promise((resolve, reject) => {
        this.ws.on("connection", () => resolve(this));
        this.ws.on("error", err => reject(err));
      });
    });
    return this.continue();
  }

  onWebsocket<ZodSchema extends ZodType, PrismaModel>(options: {
    event: string;
    cb: (
      this: Core,
      options: WebsocketData<Data<ZodSchema, PrismaModel>>
    ) => Observable<unknown> | Promise<unknown> | Promisable<void>;
  }) {
    const self = this;
    if (options.cb instanceof Queue) {
      this.extend(options.cb);
    }

    this.ws.on<Data<ZodSchema, PrismaModel>>(options.event, async (data, headers) => {
      const executor = new Executor();
      executor.extend((err, line) => {
        this.ws.emit(WS_EVENTS.LOG.LOG, { error: err, line }, headers);
      });
      const git = new Git(executor);
      const args: WebsocketData<Data<ZodSchema, PrismaModel>> = {
        data,
        headers,
        executor,
        git,
        logger: this.logger,
        get plugins() {
          return self.plugins;
        }
      };

      const stream$ = (await options.cb.call(this, args)) as ReturnType<typeof options.cb>;
      if (stream$ && stream$ instanceof Observable) {
        stream$.subscribe();
      } else if (stream$ && stream$ instanceof Promise) {
        await stream$;
      }
    });

    return this.continue();
  }

  private continue() {
    return this;
  }
}
