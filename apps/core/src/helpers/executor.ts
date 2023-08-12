import * as child_process from "node:child_process";

import { Logger } from "@k8sd/shared";

interface ProcessResponse {
  type: "stdout" | "stderr";
  data: string;
}
type PromiseChildProcess = child_process.ChildProcess & Promise<ProcessResponse>;
type Extension = (err: Error | string | null, line: string | null) => void;

export class Executor {
  private readonly _extensions: Set<Extension> = new Set();
  private readonly logger = new Logger("CommandExecutor");

  extend(fn: Extension) {
    this._extensions.add(fn);
    return this;
  }

  run(command: string | string[]) {
    const cmd = this.command(command);
    console.log(cmd);
    // const child = child_process.exec(cmd);
    //
    // this.logger.log(`Executing: ${cmd}`);
    //
    // child.stdout
    //   .on("data", (line: string) => {
    //     this._extensions.forEach(fn => fn(null, line));
    //   })
    //   .on("error", (line: string) => {
    //     this._extensions.forEach(fn => fn(line, null));
    //   });
    //
    // child.stderr
    //   .on("data", (line: string) => {
    //     this._extensions.forEach(fn => fn(line, null));
    //   })
    //   .on("error", (line: string) => {
    //     this._extensions.forEach(fn => fn(line, null));
    //   });
    //
    // child.on("close", (code: number) => {
    //   this.logger.log(`Command ${cmd} finished with code ${code}`);
    // });
    //
    // return child;
  }

  private promiseChildProcess(child: child_process.ChildProcess): PromiseChildProcess {
    const promise = new Promise<ProcessResponse>(resolve => {
      let output = "";
      let error = "";

      child.stdout.on("data", data => (output += data.toString()));

      child.stderr.on("data", data => (error += data.toString()));

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
