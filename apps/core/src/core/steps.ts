import { resolve } from "node:path";

import { merge } from "lodash";
import { $Enums, Project } from "@prisma/client";
import { lastValueFrom, MonoTypeOperatorFunction, Observable, of, switchMap, tap } from "rxjs";
import { PartialDeep } from "type-fest";
import { ZodType } from "zod";

import { projectInitSchema } from "@k8sd/shared";
import { PluginContext } from "@k8sd/plugin-builder";

import { api } from "../api/api";
import { storage } from "./storage";
import { Data } from "../types/data";
import { Queue } from "../utils/queue";
import { WebsocketData } from "../core";

export class Steps<ZodSchema extends ZodType, PrismaModel> extends Queue {
  constructor(protected readonly options: WebsocketData<Data<ZodSchema, PrismaModel>>) {
    super();
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
    const ciRoot = resolve(storage.getPath(this.options.data.name), this.options.data.ci.dir);
    const ctx: PluginContext = {
      ciRoot,
      logger: this.options.logger
    };

    const detectedPlugins = this.options.plugins.filter(plugin => plugin.detect(ctx));

    return this.next(() =>
      this.none$().pipe(this.updateProject$({ status: $Enums.Status.INSTALLING_PROVIDER }))
    );
  }

  install() {
    // const projectProvider = this.getProvider();
    // const next$ = this.none$().pipe(this.log$(`Installing ${projectProvider} provider`));

    return this.next(() =>
      this.none$().pipe(this.updateProject$({ status: $Enums.Status.PROVIDER_INSTALLED }))
    );
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
}
