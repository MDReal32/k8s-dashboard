import { readdirSync, readFileSync, statSync } from "node:fs";

import { File } from "@k8sd/shared";

export const listFiles = (path: string) => {
  const files: File[] = [];

  readdirSync(path).forEach(file => {
    const filePath = `${path}/${file}`;
    const stats = statSync(filePath);
    if (stats.isDirectory()) {
      files.push(...listFiles(filePath));
    } else {
      files.push({
        path: filePath,
        name: file,
        get stats() {
          return stats;
        },
        get content() {
          return readFileSync(filePath, "utf-8");
        }
      });
    }
  });

  return files;
};
