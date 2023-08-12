import { resolve } from "node:path";

export const STORAGE_ROOT = resolve(
  process.env.PROJECT_CWD || process.cwd(),
  process.env.STORAGE_ROOT || "storage"
);
