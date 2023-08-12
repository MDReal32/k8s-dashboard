import { Plugin } from "@k8sd/plugin-builder";

import * as pkgJson from "../package.json";

export const plugin = (): Plugin => {
  return {
    name: pkgJson.name,
    description: pkgJson.description,
    version: pkgJson.version,

    detect(ctx) {
      ctx.logger.log("Detecting provider using @k8sd/example-plugin plugin");

      return true;
    },

    executor(ctx) {
      ctx.logger.log("Hello from @k8sd/example-plugin plugin");
    }
  };
};
