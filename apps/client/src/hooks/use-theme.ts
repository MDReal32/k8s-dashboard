import { useCallback, useEffect, useState } from "react";
import { useLocalStorage } from "react-use";

type Theme = "light" | "dark";
const initialTheme: Theme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";

export const useTheme = () => {
  const [theme = "light", setTheme] = useLocalStorage<Theme>("theme", initialTheme);
  const [dataTheme, setDataTheme] = useState<Theme>(theme);

  useEffect(() => {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
      setTheme(e.matches ? "dark" : "light");
    });
  }, []);

  useEffect(() => {
    document.body.dataset.theme = dataTheme;
    setTheme(dataTheme);
  }, [dataTheme]);

  const switchTheme = useCallback(() => {
    setDataTheme(dataTheme => (dataTheme === "light" ? "dark" : "light"));
  }, []);

  return [dataTheme, switchTheme] as const;
};
