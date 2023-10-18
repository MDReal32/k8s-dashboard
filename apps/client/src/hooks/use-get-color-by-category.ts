import { useCallback } from "react";
import { useLocalStorage } from "react-use";

const colors = JSON.parse(localStorage.getItem("colors") || "{}") as Record<string, string>;
export const useGetColorByCategory = () => {
  const [, setColors] = useLocalStorage("colors", colors);

  return useCallback((category: string) => {
    if (!colors[category]) {
      colors[category] = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }
    setColors(colors);
    return colors[category];
  }, []);
};
