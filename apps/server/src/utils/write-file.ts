import { dirname } from "node:path";
import { writeFileSync, mkdirSync } from "node:fs";
import { writeFile as asyncWriteFile, mkdir } from "node:fs/promises";

export const writeFile = async (file: string, content: string) => {
  await mkdir(dirname(file), { recursive: true });
  await asyncWriteFile(file, content);
};

writeFile.sync = (file: string, content: string) => {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
};
