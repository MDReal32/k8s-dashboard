import { Stats } from "node:fs";

export interface File {
  name: string;
  path: string;
  readonly content: string;
  readonly stats: Stats;
}
