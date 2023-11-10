import { ReducerWithoutAction, useEffect, useMemo, useReducer } from "react";

import { NavbarContext } from "../context";
import { navbarSlice } from "../redux/slice";

export const useNavbarContext = (clientNavbarWidth: number): NavbarContext => {
  const [state, dispatch] = useReducer(navbarSlice.reducer, navbarSlice.getInitialState());

  const dispatchActionFn = (action: ReducerWithoutAction<any>) => (value: any) =>
    dispatch(action(value));

  const navbarWidth = useMemo(() => {
    return (
      state.values.brandWidth +
      state.values.clientRoutingElementsWidth +
      state.values.getStartedWidth
    );
  }, [state.values]);

  const isHidden = useMemo(
    () => navbarWidth > clientNavbarWidth - 100,
    [navbarWidth, clientNavbarWidth]
  );

  useEffect(() => {
    dispatch(navbarSlice.actions.setIsAnimating(true));
    dispatch(navbarSlice.actions.setIsSidebarOpen(!isHidden && state.sidebar.isOpen));
    setInterval(
      dispatchActionFn(navbarSlice.actions.setIsAnimating),
      state.animation.isAnimating ? 1000 : 0,
      false
    );
  }, [isHidden]);

  return {
    isHidden,
    isSidebarOpen: state.sidebar.isOpen,
    setIsSidebarOpen: dispatchActionFn(navbarSlice.actions.setIsSidebarOpen),
    setBrandWidth: dispatchActionFn(navbarSlice.actions.setBrandWidth),
    setClientRoutingElementsWidth: dispatchActionFn(
      navbarSlice.actions.setClientRoutingElementsWidth
    ),
    setGetStartedWidth: dispatchActionFn(navbarSlice.actions.setGetStartedWidth)
  };
};
