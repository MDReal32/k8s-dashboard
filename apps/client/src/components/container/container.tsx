import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

interface ContainerProps {
  fluid?: boolean;
  transition?: boolean | "all" | "colors" | "opacity" | "shadow" | "transform" | "none";
}

export const Container: FC<PropsWithChildren<ContainerProps>> = ({
  children,
  transition,
  fluid
}) => {
  return <div className={clsx({ "container": !fluid, "container-fluid": fluid })}>{children}</div>;
};
