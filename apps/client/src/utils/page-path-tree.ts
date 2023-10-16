import { JSX } from "react";
import { RouteObject } from "react-router-dom";

class PagePathBinaryTreeNode {
  constructor(readonly path: string) {}

  declare element: JSX.Element;
  nodes = new Set<PagePathBinaryTreeNode>();

  findNextNode(
    param: (node: PagePathBinaryTreeNode) => boolean
  ): PagePathBinaryTreeNode | undefined {
    for (const nextNode of this.nodes) {
      if (param(nextNode)) {
        return nextNode;
      }
    }
  }

  get routeObject(): RouteObject {
    return {
      path: this.path,
      element: this.element,
      children: []
    };
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
  [K in keyof T as MakeAsKey<K & string>]: K extends keyof T ? FunctionOrString<T[K]> : never;
};

export class PagePathTree<T> {
  private readonly _root = new PagePathBinaryTreeNode("/");
  private readonly _pathNodeMap = new Map<string, PagePathBinaryTreeNode>();

  addRoute<K extends string>(
    route: K,
    element: JSX.Element
  ): PagePathTree<T & { [TK in K as TK]: TK }>;
  addRoute<K extends keyof T>(route: K, element: JSX.Element): this;
  addRoute<K extends string>(
    route: K,
    element: JSX.Element
  ): PagePathTree<T & { [TK in K as TK]: TK }> | this {
    const path = route as unknown as string;

    const pathParts = path.split("/").filter(part => part !== "");
    let currentNode = this._root;
    let wholePath = "";

    for (const pathPart of pathParts) {
      wholePath += `/${pathPart}`;
      const nextNode = currentNode.findNextNode(node => node.path === wholePath);

      if (nextNode) {
        currentNode = nextNode;
        continue;
      }

      const newNode = new PagePathBinaryTreeNode(wholePath);
      currentNode.nodes.add(newNode);
      currentNode = newNode;
    }

    currentNode.element = element;
    this._pathNodeMap.set(path, currentNode);

    return this;
  }

  getRoutes() {
    return this._getRoutes(this._root);
  }

  getPathMap() {
    const pathMap = {} as AsPathMap<T>;

    for (const [path, node] of this._pathNodeMap) {
      if (node.nodes.size > 0 && !node.element) {
        continue;
      }

      const urlVariables = path.match(/\/:[^/]+/g);
      let key = path.replace(/\//g, "_").replace(/^_/, "");
      let pathFn = path as (typeof pathMap)[keyof typeof pathMap];

      if (urlVariables) {
        const vars = new Set<string>();
        urlVariables.map(variable => {
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

      pathMap[key.toUpperCase() as keyof typeof pathMap] = pathFn;
    }

    return Object.freeze(pathMap);
  }

  private _getRoutes(node: PagePathBinaryTreeNode): RouteObject[] {
    const routes: RouteObject[] = [];

    if (node.element) {
      const route = node.routeObject;

      for (const nextNode of node.nodes) {
        route.children?.push(...this._getRoutes(nextNode));
      }

      routes.push(route);
    } else {
      for (const nextNode of node.nodes) {
        routes.push(...this._getRoutes(nextNode));
      }
    }

    return routes;
  }
}
