import { RouteObject } from "react-router-dom";

export class PagePathBinaryTreeNode {
  constructor(readonly path?: string) {}

  declare name?: string;
  declare element: RouteObject["element"];
  declare queryParams?: readonly string[];

  get routeObject() {
    const route: RouteObject & { queryParams?: readonly string[] } = { element: this.element };
    if (this.path) route.path = this.path;
    if (this.name) route.id = this.name;
    if (this.queryParams) route.queryParams = this.queryParams;
    return route;
  }
}
