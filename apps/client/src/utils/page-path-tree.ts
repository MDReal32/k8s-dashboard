import { JSX } from "react";
import { RouteObject } from "react-router-dom";

class PagePathBinaryTreeNode {
  constructor(readonly path: string) {}

  declare name: string;
  declare element: RouteObject["element"];

  get routeObject(): RouteObject {
    const route: RouteObject = { element: this.element };
    if (this.path) route.path = this.path;
    if (this.name) route.id = this.name;
    return route;
  }
}

type MakeAsKey<T extends string> = T extends "/"
  ? "__ROOT__"
  : T extends `${infer K}/${infer R}`
  ? K extends ""
    ? R extends `:${infer _R}`
      ? Uppercase<MakeAsKey<_R>>
      : Uppercase<MakeAsKey<R>>
    : `${Uppercase<K>}_${R extends `:${infer _R}` ? `${MakeAsKey<_R>}` : `${MakeAsKey<R>}`}`
  : T;

type GetVariables<T extends string> = T extends `${infer _}:${infer VARIABLE}`
  ? VARIABLE extends `${infer _VARIABLE}/${infer _R}`
    ? [string, ...GetVariables<_R>]
    : [string]
  : [];

type FunctionOrString<T> = T extends `${infer _}:${infer _}`
  ? (...variables: GetVariables<T>) => string
  : string;

type AsPathMap<T> = {
  [K in keyof T as MakeAsKey<K & string>]: FunctionOrString<T[K]>;
};

type AsRouteMap<T> = {
  [K in keyof T as MakeAsKey<K & string>]: K;
};

export class PagePathTree<T> {
  private readonly _root = new PagePathBinaryTreeNode("");
  private readonly _pathNodeMap = new Map<string, PagePathBinaryTreeNode>();
  private readonly _names = new Set<string>();

  addRoute<K extends string>(
    name: string,
    route: K,
    element: JSX.Element
  ): PagePathTree<T & { [TK in K as TK]: TK }>;
  addRoute<K extends keyof T>(name: string, route: K, element: JSX.Element): this;
  addRoute<K extends string>(
    name: string,
    route: K,
    element: JSX.Element
  ): PagePathTree<T & { [TK in K as TK]: TK }> | this {
    const path = route as unknown as string;
    if (this._names.has(name)) throw new Error(`The name "${name}" is already in use.`);

    let node = this._pathNodeMap.get(path) || new PagePathBinaryTreeNode(path);
    node.name = name;
    node.element = element;
    this._pathNodeMap.set(path, node);
    this._names.add(name);

    return this;
  }

  setLayout(layout: RouteObject["element"]) {
    this._root.element = layout;
    return this;
  }

  getRoutePath(path: string) {
    const node = this._pathNodeMap.get(path);
    if (!node) throw new Error(`The path "${path}" does not exist.`);
    return node.routeObject;
  }

  getRoutes() {
    const routes = Array.from(this._pathNodeMap.values()).map(node => node.routeObject);

    if (this._root.element) {
      const rootElement = this._root.routeObject;
      delete rootElement.path;
      rootElement.children = routes;
      return [rootElement];
    }

    return routes;
  }

  getRoutePaths() {
    const routeMap = {} as AsRouteMap<T>;

    for (const [path] of this._pathNodeMap) {
      const urlVariables = path.match(/\/:[^/]+/g);
      let key = path.replace(/\//g, "_").replace(/^_/, "");

      if (urlVariables) {
        const vars = new Set<string>();
        urlVariables.forEach(variable => {
          vars.add(variable.replace(/^\/:/, ""));
          key = key.replace(variable.slice(1), variable.replace(/^\/:/, ""));
        });
      }

      routeMap[(key || "__root__").toUpperCase() as keyof typeof routeMap] = path as any;
    }

    return Object.freeze(routeMap);
  }

  getPathMap() {
    const pathMap = {} as AsPathMap<T>;

    for (const [path] of this._pathNodeMap) {
      const urlVariables = path.match(/\/:[^/]+/g);
      let key = path.replace(/\//g, "_").replace(/^_/, "");
      let pathFn = path as (typeof pathMap)[keyof typeof pathMap];

      if (urlVariables) {
        const vars = new Set<string>();
        urlVariables.forEach(variable => {
          vars.add(variable.replace(/^\/:/, ""));
          key = key.replace(variable.slice(1), variable.replace(/^\/:/, ""));
        });
        pathFn = ((...args: string[]) => {
          if (args.length !== vars.size) {
            throw new Error(
              `The number of arguments passed to the function does not match the number of variables in the URL. Expected ${vars.size} arguments, but got ${args.length}.`
            );
          }
          let url = path;
          for (const [index, variable] of Array.from(vars).entries()) {
            url = url.replace(`/:${variable}`, `/${args[index]}`);
          }
          return url;
        }) as any;
      }

      pathMap[(key || "__root__").toUpperCase() as keyof typeof pathMap] = pathFn;
    }

    return Object.freeze(pathMap);
  }
}
