import { Children, FC, PropsWithChildren, cloneElement, createElement, useMemo } from "react";

import { useTheme } from "../../hooks/use-theme";

export const SwitchTheme: FC<PropsWithChildren> = ({ children }) => {
  const [, switchTheme] = useTheme();
  return <div onClick={switchTheme}>{children}</div>;
};
