import { useEffect, useMemo, useState } from "react";

import { NavbarContext } from "../context";

export const useNavbarContext = (clientNavbarWidth: number): NavbarContext => {
  const [brandWidth, setBrandWidth] = useState(0);
  const [clientRoutingElementsWidth, setClientRoutingElementsWidth] = useState(0);
  const [getStartedWidth, setGetStartedWidth] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navbarWidth = useMemo(
    () => brandWidth + clientRoutingElementsWidth + getStartedWidth,
    [brandWidth, clientRoutingElementsWidth, getStartedWidth]
  );

  const isHidden = useMemo(
    () => navbarWidth > clientNavbarWidth - 100,
    [navbarWidth, clientNavbarWidth]
  );

  return {
    isHidden,
    isSidebarOpen,
    setIsSidebarOpen,
    setBrandWidth,
    setClientRoutingElementsWidth,
    setGetStartedWidth
  };
};
