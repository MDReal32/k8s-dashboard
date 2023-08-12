import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  GeneratorCallback,
  runTasksInSerial,
  Tree,
  updateJson
} from "@nx/devkit";

import * as path from "path";

import { PluginGeneratorSchema } from "./schema";
import { validatePkgJsonName } from "./lib/validate-pkg-json-name";
import { prependScopeIfExists } from "./lib/prepend-scope-if-exists";
import { addDependencies } from "./lib/add-dependencies";

import * as pkgJson from "../../../package.json";

export async function pluginGenerator(tree: Tree, options: PluginGeneratorSchema) {
  const tasks: GeneratorCallback[] = [];
  const projectRoot = `plugins/${options.name}`;
  const pkgName = prependScopeIfExists(
    validatePkgJsonName(options.pkgName || options.name),
    options.scope
  );

  generateFiles(tree, path.join(__dirname, "files"), projectRoot, {
    ...options,
    relativePathToTsConfig: path.relative(projectRoot, `tsconfig.base.json`),
    pluginBuilderVersion: pkgJson.version,
    name: pkgName
  });

  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: "library",
    sourceRoot: `${projectRoot}/src`,
    targets: {
      build: {
        executor: "@nx/esbuild:esbuild",
        outputs: ["{options.outputPath}"],
        options: {
          main: `${projectRoot}/src/index.ts`,
          tsConfig: `${projectRoot}/tsconfig.app.json`,
          outputPath: `build/plugins/${options.name}`,
          format: ["cjs"]
        }
      }
    }
  });

  updateJson(tree, "tsconfig.base.json", json => {
    json.compilerOptions ||= {};

    json.compilerOptions.paths = {
      ...json.compilerOptions.paths,
      [`${pkgName}`]: [`${projectRoot}/src/index.ts`]
    };

    return json;
  });

  if (!options.skipPackageJson) {
    const installPackagesTask = addDependencies(tree);
    tasks.push(installPackagesTask);
  }

  if (!options.skipFormat) {
    await formatFiles(tree);
  }

  return runTasksInSerial(...tasks);
}

export default pluginGenerator;
