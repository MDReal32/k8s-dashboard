import * as child_process from "node:child_process";

import { Logger } from "../logger";

interface ProcessResponse {
  type: "stdout" | "stderr";
  data: string;
}

type PromiseChildProcess = child_process.ChildProcess & Promise<ProcessResponse>;
type Extension = (err: Error | string | null, line: string | null) => void;

export class Executor {
  private readonly _extensions: Set<Extension> = new Set();
  private readonly logger = new Logger("CommandExecutor");
  private _cwd: string = process.cwd();

  extend(fn: Extension) {
    this._extensions.add(fn);
    return this;
  }

  cwd(cwd: string) {
    this._cwd = cwd;
    return this;
  }

  getCwd() {
    return this._cwd;
  }

  run(command: string | string[]) {
    const cmd = this.command(command);
    this.logger.log(`Executing: ${cmd}`);
    const child = child_process.exec(cmd, { cwd: this._cwd });

    child.stdout
      ?.on("data", (line: string) => {
        line
          .trim()
          .split("\n")
          .forEach(line => {
            line && this._extensions.forEach(fn => fn(null, line));
          });
      })
      .on("error", err => {
        this._extensions.forEach(fn => fn(err, null));
      });

    child.stderr
      ?.on("data", (line: string) => {
        line
          .trim()
          .split("\n")
          .forEach(line => {
            line && this._extensions.forEach(fn => fn(null, line));
          });
      })
      .on("error", err => {
        this._extensions.forEach(fn => fn(err, null));
      });

    child.on("error", err => {
      this._extensions.forEach(fn => fn(err, null));
    });

    child.on("close", (code: number) => {
      this.logger.log(`Command ${cmd} finished with code ${code}`);
    });

    return this.promiseChildProcess(child);
  }

  sync(cmd: string) {
    const child = child_process.execSync(cmd, { cwd: this._cwd });
    return child.toString().trim();
  }

  private promiseChildProcess(child: child_process.ChildProcess): PromiseChildProcess {
    const promise = new Promise<ProcessResponse>(resolve => {
      let output = "";
      let error = "";

      child.stdout?.on("data", data => (output += data.toString()));

      child.stderr?.on("data", data => (error += data.toString()));

      child.on("close", code => {
        resolve({
          type: code === 0 ? "stdout" : "stderr",
          data: code === 0 ? output : error
        });
      });
    });

    return Object.create(child, {
      then: { value: promise.then.bind(promise) },
      catch: { value: promise.catch.bind(promise) },
      finally: { value: promise.finally.bind(promise) }
    });
  }

  private command(command: string | string[]) {
    return Array.isArray(command) ? command.join(" ") : command;
  }
}

export const executor = new Executor() as Omit<Executor, "cwd">;
