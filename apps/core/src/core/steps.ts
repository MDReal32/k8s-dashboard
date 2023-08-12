import { resolve } from "node:path";

import { merge } from "lodash";
import { $Enums, Project } from "@prisma/client";
import {
  filter,
  lastValueFrom,
  map,
  MonoTypeOperatorFunction,
  Observable,
  of,
  switchMap,
  tap,
  toArray
} from "rxjs";
import { PartialDeep } from "type-fest";
import { ZodType } from "zod";

import { projectInitSchema, File } from "@k8sd/shared";
import { PluginContext, Plugin } from "@k8sd/plugin-builder";

import * as helpers from "../helpers";
import { api } from "../api/api";
import { storage } from "./storage";
import { Data } from "../types";
import { Queue } from "../utils/queue";
import { WebsocketData } from "../core";

export class Steps<ZodSchema extends ZodType, PrismaModel> extends Queue {
  private readonly helpers = helpers;
  private readonly sortedPlugins: Record<Plugin["name"], Plugin>;

  constructor(protected readonly options: WebsocketData<Data<ZodSchema, PrismaModel>>) {
    super();
    this.sortedPlugins = this.options.plugins.reduce((acc, plugin) => {
      acc[plugin.name] = plugin;
      return acc;
    }, {});
  }

  static prepare() {
    return async <ZodSchema extends ZodType, PrismaModel>(
      options: WebsocketData<Data<ZodSchema, PrismaModel>>
    ) => {
      new Steps(options).prepare();
    };
  }

  prepare() {
    switch (this.options.data.status) {
      case $Enums.Status.PROJECT_CREATING:
        return this.create();
      case $Enums.Status.PROJECT_INITIALIZING:
        return this.init();
      case $Enums.Status.PROJECT_INITIALIZED:
        return this.finishInit();
      case $Enums.Status.RETRIEVING_PROVIDER:
        return this.retrieveProvider();
      case $Enums.Status.INSTALLING_PROVIDER:
        return this.install();
      case $Enums.Status.PROVIDER_INSTALLED:
        return this.continue();
    }
  }

  create() {
    return this.next(() =>
      this.none$().pipe(
        this.log$(`Creating project ${this.options.data.name}`),
        this.updateProject$({ status: $Enums.Status.PROJECT_INITIALIZING })
      )
    );
  }

  init() {
    const url = new URL(this.options.data.repo.url);
    const repoUrl = this.options.data.repo.ssh
      ? `git@${url.host}:${url.pathname.replace(/^\//, "")}`
      : this.options.data.repo.url;

    return this.next(() =>
      this.none$().pipe(
        this.log$(`Initializing project ${this.options.data.name}`),
        switchMap(() => this.options.git.init(this.options.data.name)),
        switchMap(() => this.options.git.remote("origin", repoUrl)),
        switchMap(() => this.options.git.fetch()),
        switchMap(() => this.options.git.checkout(this.options.data.repo.branch)),
        this.updateProject$({ status: $Enums.Status.PROJECT_INITIALIZED })
      )
    );
  }

  finishInit() {
    return this.next(() =>
      this.none$().pipe(
        this.log$(`Finishing initialization of project ${this.options.data.name}`),
        this.updateProject$({ status: $Enums.Status.RETRIEVING_PROVIDER })
      )
    );
  }

  retrieveProvider() {
    const ctx = this.getPluginContext();

    const detectedPlugins = this.options.plugins.filter(plugin => plugin.detect(ctx));
    const prioritizedPlugins = detectedPlugins;

    const plugin = prioritizedPlugins[0];

    return this.next(() =>
      this.none$().pipe(
        switchMap(() => of(...this.options.plugins)),
        filter(plugin => plugin.detect(ctx)),
        toArray(),
        map(plugins => plugins.sort((a, b) => b.priority - a.priority)),
        // TODO: Handle prioritizedPlugins.length. pick most prioritized plugins. it can be 1 or more than 1 plugins.
        map(plugins => plugins[0]),
        tap<Plugin>(plugin => this.options.logger.log(`Detected provider ${plugin.name}`)),
        this.updateProject$({
          status: $Enums.Status.INSTALLING_PROVIDER,
          ci: { provider: plugin.name }
        })
      )
    );
  }

  install() {
    const plugin = this.sortedPlugins[this.options.data.ci.provider];
    if (!plugin) {
      throw new Error(`Plugin ${this.options.data.ci.provider} not found`);
    }

    return this.next(() =>
      this.none$().pipe(
        this.log$(`Installing process using provider ${plugin.name}`),
        switchMap(() => {
          const ctx = this.getPluginContext();
          const res = plugin.install(ctx);
          return res instanceof Promise ? res : Promise.resolve(res);
        }),
        this.updateProject$({ status: $Enums.Status.PROVIDER_INSTALLED })
      )
    );
  }

  private getPluginContext(): PluginContext {
    const self = this;
    const ciRoot = resolve(storage.getPath(this.options.data.name), this.options.data.ci.dir);

    return {
      name: this.options.data.name,
      ciRoot,

      logger: this.options.logger,
      executor: this.options.executor,

      find: this.find.bind(this),
      task(cb: () => Promise<void>) {
        const prevCwd = self.options.executor.getCwd();
        self.options.executor.cwd(ciRoot);
        self.next(cb).next(async () => self.options.executor.cwd(prevCwd));
      }
    };
  }

  private next(promiseOrStream$: () => Promise<unknown> | Observable<unknown>) {
    this.add(() => {
      const response = promiseOrStream$();
      if (response instanceof Observable) {
        return lastValueFrom(response);
      } else if (response instanceof Promise) {
        return response;
      }
    });

    this.add(this.prepare.bind(this));
    return this.continue();
  }

  private continue() {
    return this;
  }

  private log$<T>(message: string | ((data: T) => string)): MonoTypeOperatorFunction<T> {
    return tap(data => {
      const msg = typeof message === "function" ? message(data) : message;
      this.options.logger.log(msg);
    });
  }

  private none$(): Observable<unknown> {
    return of(void 0);
  }

  private updateProject$(partialData: PartialDeep<Data<typeof projectInitSchema, Project>>) {
    return switchMap(() =>
      api.project
        .patch$(this.options.data.id, partialData)
        .pipe(tap(project => merge(this.options.data, project.data)))
    );
  }

  private find(path: string, cb: (file: File) => boolean) {
    const files = this.helpers.listFiles(path);
    return files.find(file => cb(file));
  }
}
