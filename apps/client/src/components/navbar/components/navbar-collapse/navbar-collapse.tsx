import { Children, FC, PropsWithChildren, useContext, useEffect } from "react";

import { Transition } from "@headlessui/react";

import { NavbarCtx } from "../../context";

interface NavbarCollapseProps {
  width: number;
  toggleSide: "left" | "right";
}

export const NavbarCollapse: FC<PropsWithChildren<NavbarCollapseProps>> = ({
  children,
  width,
  toggleSide
}) => {
  const { isHidden, isSidebarOpen, setIsSidebarOpen, setClientRoutingElementsWidth } =
    useContext(NavbarCtx);

  useEffect(() => {
    setClientRoutingElementsWidth(width);
  }, [width]);

  const transitionClasses = {
    enter: "transition-all duration-300",
    enterFrom: toggleSide === "left" ? "-left-full" : "-right-full",
    enterTo: toggleSide === "left" ? "left-0" : "right-0",
    leave: "transition-all duration-300",
    leaveFrom: toggleSide === "left" ? "left-0" : "right-0",
    leaveTo: toggleSide === "left" ? "-left-full" : "-right-full"
  };

  return (
    <>
      <Transition
        show={!isHidden}
        enter="transition-all duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-all duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="w-auto">
          <div className="mt-0 flex flex-row gap-8 rounded-lg p-4 font-medium">{children}</div>
        </div>
      </Transition>

      <Transition
        show={isSidebarOpen}
        className="fixed top-0 z-50 h-full w-1/2"
        {...transitionClasses}
      >
        <div
          className="absolute bottom-0 left-0 right-0 top-0 bg-black bg-opacity-50"
          onClick={() => setIsSidebarOpen(false)}
        />

        <div>
          {/* ToDo: Add proper styling */}
          <ul>
            {Children.map(children, child => (
              <li>{child}</li>
            ))}
          </ul>
        </div>
      </Transition>
    </>
  );
};
