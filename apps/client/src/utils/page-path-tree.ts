import { JSX } from "react";
import { RouteObject } from "react-router-dom";

import { PagePathBinaryTreeNode } from "./page-path-binary-tree";

type SetValue<TKey extends string, TValue> = { [TK in TKey]: TValue };

type GetVariables<
  TPath extends string,
  TQueryParams extends readonly string[] | undefined
> = TPath extends `${infer _}:${infer Variable}`
  ? Variable extends `${infer VariablePart}/${infer Rest}`
    ? { [K in VariablePart]: string } & GetVariables<Rest, TQueryParams>
    : { [K in Variable]: string } & GetVariables<"", TQueryParams>
  : TQueryParams extends readonly string[]
  ? TQueryParams extends [
      infer TQueryParam extends string,
      ...infer RestParams extends readonly string[]
    ]
    ? Partial<GetVariables<`:${TQueryParam}`, RestParams>>
    : unknown
  : unknown;

type ParseParams<T extends { route: string; qs?: readonly string[] }> =
  T["route"] extends `${infer _}:${infer _}`
    ? (variables: GetVariables<T["route"], T["qs"]>) => string
    : T["qs"] extends readonly string[]
    ? (variables: GetVariables<T["route"], T["qs"]>) => string
    : string;

type MakeAsKey<T extends string> = T extends "/"
  ? "__ROOT__"
  : T extends `${infer K}/${infer R}`
  ? K extends ""
    ? R extends `:${infer _R}`
      ? Uppercase<MakeAsKey<_R>>
      : Uppercase<MakeAsKey<R>>
    : `${Uppercase<K>}_${R extends `:${infer _R}` ? `${MakeAsKey<_R>}` : `${MakeAsKey<R>}`}`
  : T;

type AsPathMap<T extends Record<string, { route: string; qs?: readonly string[] }>> = {
  [K in keyof T as MakeAsKey<K & string>]: ParseParams<T[K]>;
};

type AsRouteMap<T> = {
  [K in keyof T as MakeAsKey<K & string>]: K;
};

export class PagePathTree<T extends Record<string, { route: string; qs?: readonly string[] }>> {
  private readonly _root = new PagePathBinaryTreeNode();
  private readonly _pathNodeMap = new Map<string, PagePathBinaryTreeNode>();
  private readonly _names = new Set<string>();

  addRoute<TKey extends string>(
    name: string,
    route: TKey,
    element: JSX.Element
  ): PagePathTree<T & SetValue<TKey, { route: TKey }>>;
  addRoute<TKey extends string, TQueryParams extends readonly string[]>(
    name: string,
    route: TKey,
    element: JSX.Element,
    ...queryParams: TQueryParams
  ): PagePathTree<T & SetValue<TKey, { route: TKey; qs: TQueryParams }>>;
  addRoute<TKey extends string, TQueryParams extends readonly string[]>(
    name: string,
    route: TKey,
    element: JSX.Element,
    ...queryParams: TQueryParams
  ): any {
    const path = route as unknown as string;
    if (this._names.has(name)) throw new Error(`The name "${name}" is already in use.`);

    let node = this._pathNodeMap.get(path) || new PagePathBinaryTreeNode(path);
    node.name = name;
    node.element = element;
    node.queryParams = queryParams;
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

    for (const [path, page] of this._pathNodeMap) {
      let key = path.replace(/\//g, "_").replace(/^_/, "");
      let pathFn = path as (typeof pathMap)[keyof typeof pathMap];

      const urlVariables = path.match(/\/:[^/]+/g);
      const qsParams = page.queryParams;
      if (urlVariables || qsParams) {
        const vars = new Set<string>();
        urlVariables?.forEach(variable => {
          vars.add(variable.replace(/^\/:/, ""));
          key = key.replace(variable.slice(1), variable.replace(/^\/:/, ""));
        });
        pathFn = ((variables: Record<string, string>) => {
          let url = path;
          for (const [, variable] of Array.from(vars).entries()) {
            url = url.replace(`/:${variable}`, `/${variables[variable]}`);
          }
          let qs: string[] = [];
          page.queryParams?.forEach(queryParam => {
            if (variables[queryParam]) {
              qs.push(`${queryParam}=${variables[queryParam]}`);
            }
          });
          qs.length > 0 && (url = `${url}?${qs.join("&")}`);
          return url;
        }) as any;
      }

      pathMap[(key || "__root__").toUpperCase() as keyof typeof pathMap] = pathFn;
    }

    return Object.freeze(pathMap);
  }
}
