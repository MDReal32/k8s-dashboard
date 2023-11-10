import { FC, PropsWithChildren, useContext } from "react";

import { Transition } from "@headlessui/react";

import { NavbarCtx } from "../../context";

interface NavbarToggleProps {}

export const NavbarToggle: FC<PropsWithChildren<NavbarToggleProps>> = ({ children }) => {
  const { isHidden, isSidebarOpen, setIsSidebarOpen } = useContext(NavbarCtx);

  return (
    <Transition
      show={isHidden}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>{children}</button>
    </Transition>
  );
};
