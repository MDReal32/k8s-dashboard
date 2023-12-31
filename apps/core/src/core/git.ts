import { Logger, Executor } from "@k8sd/shared";

import { Command } from "./command";
import { storage } from "./storage";

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

  init(name: string, options: GitInitOptions = {}) {
    storage.createDirectory(storage.getRepoPath(name));
    this.logger.log(`Initializing git repository in ${storage.getRepoPath(name)}`);
    this.executor.cwd(storage.getRepoPath(name));
    return this.executor.run(this.cmd("init", this.getArgs(options)));
  }

  remote(name: string, url: string) {
    return this.executor.run(this.cmd("remote", "add", name, url));
  }

  fetch(options?: GitFetchOptions) {
    return this.executor.run(this.cmd("fetch", this.getArgs(options)));
  }

  checkout(branch: string) {
    return this.executor.run(this.cmd("checkout", branch));
  }

  pull(name?: string, options?: GitPullOptions) {
    return this.executor.run(this.cmd("pull", name, this.getArgs(options)));
  }

  protected cmd(...command: (string | string[])[]): string {
    return super.cmd(this.executor.which("git"), ...command);
  }
}

export const git = (executor: Executor) => new Git(executor);
