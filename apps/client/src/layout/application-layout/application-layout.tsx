import { Button, DarkThemeToggle, Flowbite, Navbar } from "flowbite-react";
import { FC } from "react";
import { Link, Outlet } from "react-router-dom";

import { NavbarLink } from "../../components/navbar-link";
import { routePaths } from "../../routes";

export const ApplicationLayout: FC = () => {
  return (
    <Flowbite className="transition-all">
      <div className="h-screen transition-all">
        <Navbar>
          <Navbar.Brand as={Link} to="/">
            <span className="dark:text-white">K8S Dashboard</span>
          </Navbar.Brand>

          <div className="flex md:order-2 gap-2">
            <Navbar.Toggle />
            <Button>Get started</Button>
            <DarkThemeToggle />
          </div>

          <Navbar.Collapse>
            <NavbarLink paths={[routePaths.__ROOT__]} />
            <NavbarLink paths={[routePaths.PROJECTS]} />
            <NavbarLink
              paths={[routePaths.GRAPH, routePaths.GRAPH_NAMESPACE]}
              updateVariable={namespace => (namespace === "_" ? "All" : namespace)}
            />
          </Navbar.Collapse>
        </Navbar>

        <div className="relative h-full">
          <Outlet />
        </div>
      </div>
    </Flowbite>
  );
};
