import { Promisable } from "type-fest";

import { Logger, File, Executor } from "@k8sd/shared";

export interface PluginContext {
  name: string;
  ciRoot: string;

  logger: Logger;
  executor: Executor;

  find(path: string, file: (file: File) => boolean): File | undefined;
  task(cb: () => Promise<void>): void;
}

export interface Plugin {
  name: string;
  description: string;
  version: string;
  priority?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

  detect(context: PluginContext): boolean;

  install(context: PluginContext): Promisable<void>;
}
