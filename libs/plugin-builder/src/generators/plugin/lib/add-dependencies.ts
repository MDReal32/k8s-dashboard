import { addDependenciesToPackageJson, type Tree, type GeneratorCallback } from "@nx/devkit";

export const addDependencies = (tree: Tree): GeneratorCallback => {
  return addDependenciesToPackageJson(
    tree,
    {
      tslib: "^2.3.0"
    },
    {}
  );
};
