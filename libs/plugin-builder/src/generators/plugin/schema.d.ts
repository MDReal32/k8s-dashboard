export interface PluginGeneratorSchema {
  name: string;
  scope?: string;
  skipPackageJson?: boolean;
  skipFormat?: boolean;
  pkgName?: string;
}
