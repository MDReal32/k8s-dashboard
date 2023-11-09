import { Dispatch, SetStateAction, createContext } from "react";

export interface NavbarContext {
  isHidden: boolean;
  isSidebarOpen: boolean;

  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;

  setBrandWidth(value: number): void;

  setClientRoutingElementsWidth(value: number): void;

  setGetStartedWidth(value: number): void;
}

export const NavbarCtx = createContext<NavbarContext>({} as NavbarContext);
