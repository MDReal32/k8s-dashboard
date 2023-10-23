import { readdir } from "node:fs/promises";
import { resolve } from "node:path";

(async () => {
  const root = __dirname;
  await readdir(__dirname)
    .then(files => files.map(file => import(resolve(root, file, "seed.ts"))))
    .then(imports => Promise.all(imports));
})();
