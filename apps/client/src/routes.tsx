import { createBrowserRouter } from "react-router-dom";

import { ApplicationLayout } from "./layout/application-layout";
import { Graph } from "./pages/graph";
import { PagePathTree } from "./utils/page-path-tree";

export const routeBuilder = new PagePathTree()
  .setLayout(<ApplicationLayout />)
  .addRoute("Graph", "/graph", <Graph />)
  .addRoute("Graph (:namespace)", "/graph/:namespace", <Graph />);

export const routes = routeBuilder.getRoutes();
export const pathMap = routeBuilder.getPathMap();
export const router = createBrowserRouter(routes);
