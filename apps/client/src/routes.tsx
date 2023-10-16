import { createBrowserRouter } from "react-router-dom";

import { Graph } from "./pages/graph";
import { PagePathTree } from "./utils/page-path-tree";

const routeBuilder = new PagePathTree()
  .addRoute("/graph", <Graph />)
  .addRoute("/graph/:namespace", <Graph />);

export const routes = routeBuilder.getRoutes();
export const pathMap = routeBuilder.getPathMap();
export const router = createBrowserRouter(routes);
