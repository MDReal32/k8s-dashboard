import { PackageJson } from "type-fest";

import { Plugin } from "@k8sd/plugin-builder";
import { Logger } from "@k8sd/shared";

import rootPkgJson from "../../package.json";

export const retrievePlugins = (pkgJson: PackageJson) => {
  const deps = [
    ...Object.keys(pkgJson.dependencies || {}),
    ...Object.keys(pkgJson.devDependencies || {})
  ];

  return deps
    .filter(dep => dep.startsWith("@k8sd/plugin-"))
    .filter(dep => dep !== rootPkgJson.name);
};

export const fetchPlugins = async (deps: string[]): Promise<Plugin[]> => {
  const logger = new Logger("PluginBuilder.fetchPlugins");

  const promises = deps.map(dep =>
    (import(dep) as Promise<{ default?: () => Plugin; plugin?: () => Plugin }>).then(module =>
      (module.plugin || module.default)?.()
    )
  );

  return Promise.all(promises)
    .then(plugins => plugins.filter(plugin => plugin !== null))
    .catch(err => {
      logger.error(err);
      return null;
    });
};
