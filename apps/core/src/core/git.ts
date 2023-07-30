import { executor, Executor } from "../helpers/executor";
import { Logger } from "../main";
import { Command } from "./command";

interface GitBaseOptions {
  recursive?: boolean;
}

interface GitInitOptions extends GitBaseOptions {}

interface GitFetchOptions extends GitBaseOptions {}

interface GitPullOptions extends GitBaseOptions {}

export class Git extends Command {
  private readonly logger = new Logger("Git");

  constructor(private readonly executor: Executor) {
    super();
    this.executor.extend((err, line) => this.logger[err ? "error" : "log"](err || line));
  }

  init() {
    return this.executor.run(this.cmd("init"));
  }

  remote(name: string, url: string) {
    return this.executor.run(this.cmd("remote", "add", name, url));
  }

  fetch(name?: string, options?: GitFetchOptions) {
    return this.executor.run(this.cmd("fetch", name, this.getArgs(options)));
  }

  pull(name?: string, options?: GitPullOptions) {
    return this.executor.run(this.cmd("pull", name, this.getArgs(options)));
  }

  protected cmd(...command: (string | string[])[]): string {
    return super.cmd("git", ...command);
  }
}

export const git = new Git(executor);
