import clsx from "clsx";
import { ComponentProps, FC, PropsWithChildren, useRef, useState } from "react";

import {
  NavbarBrand,
  NavbarCollapse,
  NavbarGetStarted,
  NavbarLink,
  NavbarToggle
} from "./components";
import { NavbarCtx } from "./context";
import { useNavbarContext } from "./hooks/use-navbar-context";
import { useOnUpdateClientWidth } from "./hooks/use-on-update-client-width";

interface NavbarProps extends ComponentProps<"nav"> {}

type NavbarType = FC<PropsWithChildren<NavbarProps>> & {
  Link: typeof NavbarLink;
  Brand: typeof NavbarBrand;
  Collapse: typeof NavbarCollapse;
  Toggle: typeof NavbarToggle;
  GetStarted: typeof NavbarGetStarted;
};

export const Navbar: NavbarType = ({ children, className }) => {
  const ref = useRef<HTMLElement>(null);
  const [clientNavbarWidth, setClientNavbarWidth] = useState(0);
  const contextHandler = useNavbarContext(clientNavbarWidth);
  useOnUpdateClientWidth(ref, setClientNavbarWidth);

  return (
    <NavbarCtx.Provider value={contextHandler}>
      <nav data-test-id="nav" ref={ref} className={clsx("border-gray-200", className)}>
        <div className="mx-auto flex flex-wrap items-center justify-between p-4">{children}</div>
      </nav>
    </NavbarCtx.Provider>
  );
};

Navbar.Brand = NavbarBrand;
Navbar.Collapse = NavbarCollapse;
Navbar.GetStarted = NavbarGetStarted;
Navbar.Link = NavbarLink;
Navbar.Toggle = NavbarToggle;
