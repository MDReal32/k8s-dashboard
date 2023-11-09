import { createContext } from "react";

export interface ThemeContext {
  theme: string;
  switchTheme: () => void;
}

export const ThemeContext = createContext<ThemeContext>({
  theme: "light",
  switchTheme: () => {}
});
