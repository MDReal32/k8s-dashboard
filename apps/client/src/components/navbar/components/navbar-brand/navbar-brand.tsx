import clsx from "clsx";
import { FC, PropsWithChildren, createElement, useContext, useRef } from "react";

import { AsProps } from "../../../../types/as";
import { NavbarCtx } from "../../context";
import { useOnUpdateClientWidth } from "../../hooks/use-on-update-client-width";
import { NavbarLink } from "../navbar-link";

type NavbarBrandFC = <TProps>(props: PropsWithChildren<AsProps<TProps>>) => ReturnType<FC>;

export const NavbarBrand: NavbarBrandFC = ({ children, as: Component = NavbarLink, ...props }) => {
  const { setBrandWidth } = useContext(NavbarCtx);
  const containerRef = useRef<HTMLDivElement>(null);
  useOnUpdateClientWidth(containerRef, setBrandWidth);

  const element = createElement(
    Component,
    { className: clsx("flex items-center", "className" in props && props.className!), ...props },
    children
  );

  return <div ref={containerRef}>{element}</div>;
};
