import { dirname, resolve } from "node:path";
import { copyFileSync } from "node:fs";

import { lastValueFrom } from "rxjs";

import { CommandBuilder, Plugin, PluginContext } from "@k8sd/plugin-sdk";

import * as pkgJson from "../package.json";

const checkHelm = (ctx: PluginContext) => {
  let helm = false;

  try {
    ctx.executor.sync("helm version");
    helm = true;
  } catch {}

  return { helm };
};

const getFile = (ctx: PluginContext) => {
  const foundFile = ctx.find(ctx.ciRoot, file => file.name === "Chart.yaml");
  return { helm: foundFile };
};

interface HelmDeployment {
  name: string;
  namespace: string;
  revision: number;
  updated: string;
  status: string;
  chart: string;
  appVersion: string;
}

const parseOutput = (output: string) => {
  const lines = output.trim().split("\n");
  const header = lines[0].split(/\s+/);
  return lines.slice(1).map(line => {
    const values = line.match(/\S+/g);
    const entry = {} as HelmDeployment;
    header.forEach((key, index) => {
      entry[key.toLowerCase()] = values[index];
    });
    return entry;
  });
};

const appList = (ctx: PluginContext) => {
  return parseOutput(ctx.executor.sync("helm list --all"));
};

export const plugin = (): Plugin => {
  return {
    name: pkgJson.name,
    description: pkgJson.description,
    version: pkgJson.version,
    priority: 6,

    detect(ctx) {
      const foundFiles = getFile(ctx);
      return !!foundFiles.helm;
    },

    async install(ctx) {
      ctx.logger.log("Installing using @k8sd/plugin-helm");
      const foundFiles = getFile(ctx);
      const values = ctx.find(ctx.ciRoot, file => file.name === "values.yaml");
      const { helm } = checkHelm(ctx);

      if (!helm) {
        ctx.logger.error("helm not found");
        throw new Error("helm not found");
      }

      if (!foundFiles.helm) {
        ctx.logger.error("Chart.yaml not found");
        throw new Error("Chart.yaml not found");
      }

      if (!values) {
        ctx.logger.error("values.yaml not found");
        throw new Error("values.yaml not found");
      }

      const apps = appList(ctx);
      const found = apps.find(app => app.name === ctx.name);
      const newValuesFile = resolve(ctx.root, "values.yaml");
      copyFileSync(values.path, newValuesFile);
      const namespaceResponse = await lastValueFrom(ctx.api.k8s.namespace.get$());
      const namespaces = namespaceResponse.data.map(ns => ns.name);

      if (!namespaces.includes(ctx.name)) {
        ctx.executor.sync(
          new CommandBuilder(ctx.executor.which("kubectl"))
            .addCommand("create")
            .addArgument("namespace", ctx.name)
            .toString()
        );
      }

      const cmd = new CommandBuilder(ctx.executor.which("envsubst"))
        .input(newValuesFile)
        .pipe(ctx.executor.which("helm"))
        .addCommand(found ? "upgrade" : "install")
        .addArgv(ctx.name)
        .addArgv(dirname(foundFiles.helm.path))
        .addArgument("values", "-")
        .addArgument("namespace", ctx.name);

      await ctx.executor.run(cmd.toString());
    }
  };
};
