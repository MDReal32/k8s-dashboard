import { FC, PropsWithChildren, createElement } from "react";

import { AsProps } from "../../../../types/as";

interface LinkProps {
  active?: boolean;
}

type NavbarLinkFC = <TProps>(
  props: PropsWithChildren<AsProps<TProps> & LinkProps>
) => ReturnType<FC>;

export const NavbarLink: NavbarLinkFC = ({
  children,
  as: Component = "a",
  active = false,
  ...props
}) => {
  return createElement(Component, props, children);
};
