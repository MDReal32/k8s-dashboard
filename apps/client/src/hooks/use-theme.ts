import { useCallback, useEffect, useState } from "react";
import { useLocalStorage } from "react-use";

type Theme = "light" | "dark";
const htmlContainer = document.querySelector("html")!;
const initialTheme: Theme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";

export const useTheme = () => {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", initialTheme, { raw: true });
  const [dataTheme, setDataTheme] = useState<Theme>(() => theme || "light");

  useEffect(() => {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
      setDataTheme(e.matches ? "dark" : "light");
    });
  }, []);

  useEffect(() => {
    htmlContainer.dataset.theme = dataTheme;
    setTheme(dataTheme);
  }, [dataTheme]);

  const switchTheme = useCallback(() => {
    setDataTheme(dataTheme => (dataTheme === "light" ? "dark" : "light"));
  }, []);

  return [dataTheme, switchTheme] as const;
};
