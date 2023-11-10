import { RefObject, useCallback } from "react";
import { useEvent } from "react-use";

export const useOnUpdateClientWidth = <TElement extends HTMLElement>(
  ref: RefObject<TElement>,
  update: (width: number) => void
) => {
  const handleResize = useCallback(() => {
    if (ref.current) {
      update(ref.current.clientWidth);
    }
  }, []);

  useEvent("resize", handleResize);
};
