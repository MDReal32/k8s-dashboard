import { ReducerWithoutAction, useCallback, useMemo } from "react";

import { useDispatch, useSelector } from "../../../hooks/use-store";
import {
  setBrandWidth,
  setClientRoutingElementsWidth,
  setGetStartedWidth,
  setIsSidebarOpen
} from "../../../redux/reducer/layout/navbar";
import { NavbarContext } from "../context";

export const useNavbarContext = (clientNavbarWidth: number): NavbarContext => {
  const navbar = useSelector(state => state.layout.navbar);
  const dispatch = useDispatch();

  const dispatchActionFn = useCallback(
    (action: ReducerWithoutAction<any>) => (value: any) => dispatch(action(value)),
    []
  );

  const navbarWidth = useMemo(() => {
    return (
      navbar.values.brandWidth +
      navbar.values.clientRoutingElementsWidth +
      navbar.values.getStartedWidth
    );
  }, [navbar.values]);

  const isHidden = useMemo(
    () => navbarWidth > clientNavbarWidth - 100,
    [navbarWidth, clientNavbarWidth]
  );

  return {
    isHidden,
    isSidebarOpen: navbar.sidebar.isOpen,
    setIsSidebarOpen: dispatchActionFn(setIsSidebarOpen),
    setBrandWidth: dispatchActionFn(setBrandWidth),
    setClientRoutingElementsWidth: dispatchActionFn(setClientRoutingElementsWidth),
    setGetStartedWidth: dispatchActionFn(setGetStartedWidth)
  };
};
