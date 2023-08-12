export const prependScopeIfExists = (name: string, scope?: string) =>
  scope ? `@${scope}/${name}` : name;
