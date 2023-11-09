import { Children, FC, PropsWithChildren, useMemo } from "react";

import { useTheme } from "../../hooks/use-theme";
import { Light } from "./components";
import { ThemeContext } from "./context";

type SwitchThemeType = FC<PropsWithChildren> & { Light: typeof Light };

export const SwitchTheme: SwitchThemeType = ({ children }) => {
  const [theme, switchTheme] = useTheme();

  const lightThemeElement = useMemo(
    () => Children.toArray(children).find(child => (child as any)?.type === Light) || null,
    [children]
  );

  const darkThemeElement = useMemo(
    () => Children.toArray(children).filter(child => (child as any)?.type !== Light) || null,
    [lightThemeElement]
  );

  const element = useMemo(
    () => (theme === "light" ? lightThemeElement : darkThemeElement),
    [theme, lightThemeElement, darkThemeElement]
  );

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      <button onClick={switchTheme}>{element}</button>
    </ThemeContext.Provider>
  );
};

SwitchTheme.Light = Light;
