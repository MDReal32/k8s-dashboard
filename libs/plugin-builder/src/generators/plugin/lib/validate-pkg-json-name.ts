import validate from "validate-npm-package-name";

export const validatePkgJsonName = (name: string) => {
  const { validForNewPackages } = validate(name);

  if (!validForNewPackages) {
    throw new Error(`Invalid package.json name: "${name}"`);
  }

  return name;
};
