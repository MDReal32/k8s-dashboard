import { FC } from "react";
import { Link, Outlet } from "react-router-dom";

import { ALL_NAMESPACES } from "@k8sd/shared";

import { Container } from "../../components/container";
import { Navbar } from "../../components/navbar";
import { NavbarLink } from "../../components/navbar-link";
import { SwitchTheme } from "../../components/switch-theme";
import { routePaths } from "../../routes";

export const ApplicationLayout: FC = () => {
  return (
    <>
      <Container transition>
        <header>
          <Navbar>
            <Navbar.Brand as={Link} to="/">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="mr-3 h-8"
                alt="Flowbite Logo"
              />
              <span className="self-center whitespace-nowrap text-2xl font-semibold">
                K8S Dashboard
              </span>
            </Navbar.Brand>

            <Navbar.GetStarted className="flex gap-2">
              <Navbar.Toggle>
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </Navbar.Toggle>

              <SwitchTheme>
                <SwitchTheme.Light>Light Theme</SwitchTheme.Light>
                Dark Theme
              </SwitchTheme>
            </Navbar.GetStarted>

            <Navbar.Collapse width={230} toggleSide="right">
              <NavbarLink paths={[routePaths.__ROOT__]} />
              <NavbarLink paths={[routePaths.PROJECTS]} />
              <NavbarLink
                paths={[routePaths.GRAPH, routePaths.GRAPH_NAMESPACE]}
                updateVariable={namespace => (namespace === ALL_NAMESPACES ? "All" : namespace)}
              />
            </Navbar.Collapse>
          </Navbar>
        </header>
      </Container>

      <div className="relative">
        <Outlet />
      </div>

      <Container transition>
        <footer></footer>
      </Container>
    </>
  );
};
