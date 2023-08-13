import { Stream } from "node:stream";
import { createWriteStream, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { STORAGE_ROOT } from "../const";

export class Storage {
  constructor(private readonly root: string) {}

  getPath(name: string) {
    return resolve(this.root, name);
  }

  getRepoPath(name: string) {
    return resolve(this.getPath(name), "repo");
  }

  createFile(path: string, content: string | Buffer | Stream) {
    const filePath = this.getPath(path);
    this.createDirectory(dirname(filePath));

    if (content instanceof Stream) {
      const stream = createWriteStream(filePath);
      content.pipe(stream);
      return new Promise<void>((resolve, reject) => {
        stream.on("finish", resolve);
        stream.on("error", reject);
      });
    }

    return writeFileSync(resolve(this.root, path), content);
  }

  createDirectory(path: string) {
    return mkdirSync(this.getPath(path), { recursive: true });
  }
}

export const storage = new Storage(STORAGE_ROOT);
