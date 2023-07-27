import { Injectable, Logger } from "@nestjs/common";
import { simpleGit } from "simple-git";

interface GitOptions {
  branch?: string;
  cwd?: string;
}

interface GitCloneOptions extends GitOptions {
  name?: string;
}

interface GitPushOptions extends GitOptions {
  origin?: string;
  branch?: string;
}

interface GitCommitOptions extends GitOptions {
  amend?: boolean;
}

@Injectable()
export class GitService {
  private readonly git = simpleGit();
  private readonly logger = new Logger("GitService");

  async init(options?: GitOptions) {
    this.prepare(options);
    return this.git.init();
  }

  clone(repoUrl: string, options?: GitCloneOptions) {
    this.prepare(options);
    this.logger.log(`Cloning ${repoUrl}`);
    return this.git.clone(repoUrl, options.cwd, { "--branch": options?.branch });
  }

  pull(options?: GitOptions) {
    this.prepare(options);
    return this.git.pull();
  }

  add(files: string | string[], options: GitOptions) {
    this.prepare(options);
    return this.git.add(files);
  }

  commit(message: string, options?: GitCommitOptions) {
    this.prepare(options);
    return this.git.commit(message, { "--amend": options?.amend.toString() });
  }

  push(options?: GitPushOptions) {
    this.prepare(options);
    return this.git.push(options?.origin, options?.branch);
  }

  status(options?: GitOptions) {
    this.prepare(options);
    return this.git.status();
  }

  fetch(options: GitOptions) {
    this.prepare(options);
    return this.git.fetch();
  }

  checkout(options?: GitOptions) {
    this.prepare(options);
    return this.git.checkout(options.branch);
  }

  private prepare(options: GitOptions) {
    this.git.cwd(options?.cwd);
  }
}
