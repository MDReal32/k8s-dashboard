import { FC, PropsWithChildren } from "react";

export const Controls: FC<PropsWithChildren> = ({ children }) => {
  return <div className="absolute right-0 top-0 w-40 h-52 bg-gray-500 z-10">{children}</div>;
};
