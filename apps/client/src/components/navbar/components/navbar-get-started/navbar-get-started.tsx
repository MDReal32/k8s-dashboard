import clsx from "clsx";
import { ComponentProps, FC, PropsWithChildren, useContext, useRef } from "react";

import { NavbarCtx } from "../../context";
import { useOnUpdateClientWidth } from "../../hooks/use-on-update-client-width";

export const NavbarGetStarted: FC<PropsWithChildren<Omit<ComponentProps<"div">, "ref">>> = ({
  children,
  className,
  ...props
}) => {
  const { setGetStartedWidth } = useContext(NavbarCtx);
  const containerRef = useRef<HTMLDivElement>(null);
  useOnUpdateClientWidth(containerRef, setGetStartedWidth);

  return (
    <div ref={containerRef} className={clsx("order-2", className)} {...props}>
      {children}
    </div>
  );
};
