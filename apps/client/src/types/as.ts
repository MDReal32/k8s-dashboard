import { ElementType } from "react";

export type AsProps<TProps> = TProps & { as?: ElementType<TProps> };
