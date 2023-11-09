import { RefObject, useEffect } from "react";

export const useOnUpdateClientWidth = <TElement extends HTMLElement>(
  ref: RefObject<TElement>,
  update: (width: number) => void
) => {
  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        update(ref.current.clientWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
};
