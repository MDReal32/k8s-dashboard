import { createContext } from "react";

export interface NavbarContext {
  isHidden: boolean;
  isSidebarOpen: boolean;

  setIsSidebarOpen(value: boolean): void;

  setBrandWidth(value: number): void;

  setClientRoutingElementsWidth(value: number): void;

  setGetStartedWidth(value: number): void;
}

export const NavbarCtx = createContext<NavbarContext>({} as NavbarContext);
