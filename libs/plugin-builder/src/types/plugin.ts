import { Promisable } from "type-fest";

import { Logger } from "@k8sd/shared";

export interface PluginContext {
  ciRoot: string;
  logger: Logger;
}

export interface Plugin {
  name: string;
  description: string;
  version: string;
  priority?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

  detect(context: PluginContext): Promisable<boolean>;

  executor(context: PluginContext): Promisable<void>;
}
