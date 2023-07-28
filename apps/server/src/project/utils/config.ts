import { resolve } from "node:path";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";

import { BadRequestException } from "@nestjs/common";
import { dump, load } from "js-yaml";
import { PartialDeep } from "type-fest";
import { merge } from "lodash";

import { GITHUB_VALIDATE_RE } from "@ugrab/k8s-shared";

import { ProjectConfig } from "../types/project.config";
import { writeFile } from "../../utils/write-file";
import { ProjectInitDto } from "../dto/project-init.dto";

export class Config {
  private readonly appRoot = resolve(process.env.PROJECT_CWD || process.cwd());
  private readonly cwd = resolve(this.appRoot, "node_modules/.cache/k8s-dashboard");

  constructor(private config: PartialDeep<ProjectConfig> = {}) {}

  setName(name: string) {
    this.config.name = name;
    return this;
  }

  setRepositoryUrl(repositoryUrl: string) {
    const repo = repositoryUrl.match(GITHUB_VALIDATE_RE);
    if (!repo) {
      throw new BadRequestException("Invalid repository url");
    }
    this.config.git ||= {};
    this.config.git.owner = repo.groups.owner;
    this.config.git.repo = repo.groups.repo.toLowerCase();
    return this;
  }

  setBranch(branch: string) {
    this.config.git ||= {};
    this.config.git.branch = branch;
    return this;
  }

  setSsh(ssh: boolean) {
    this.config.git ||= {};
    this.config.git.ssh = ssh;
    return this;
  }

  setCiDir(ciDir: string) {
    this.config.ci ||= {};
    this.config.ci.dir = ciDir;
    return this;
  }

  setDone(done: boolean) {
    this.config.setup ||= {};
    this.config.setup.done = done;
    return this;
  }

  set(data: PartialDeep<ProjectInitDto>) {
    data.name && this.setName(data.name);
    data.repositoryUrl && this.setRepositoryUrl(data.repositoryUrl);
    data.branch && this.setBranch(data.branch);
    typeof data.ssh === "boolean" && this.setSsh(data.ssh);
    data.ciDir && this.setCiDir(data.ciDir);
    return this;
  }

  get repoUrl() {
    return this.config.git.ssh
      ? `git@github.com:${this.config.git.owner}/${this.config.git.repo}.git`
      : `https://github.com/${this.config.git.owner}/${this.config.git.repo}.git`;
  }

  get name() {
    return this.config.name;
  }

  get branch() {
    return this.config.git.branch;
  }

  get configDir() {
    return resolve(this.cwd, this.config.name);
  }

  get repoDir() {
    return resolve(this.configDir, "repo");
  }

  get ciDir() {
    return resolve(this.repoDir, this.config.ci.dir);
  }

  get setupDone() {
    return this.config.setup?.done || false;
  }

  async loadConfig(name: string) {
    this.setName(name);
    const configFile = resolve(this.configDir, "k8s-project-config.yml");
    const config = await readFile(configFile, "utf-8");
    const jsonConfig = load(config) as ProjectConfig;
    merge(this.config, jsonConfig);
    return this;
  }

  saveConfig(byPass = false) {
    const configFile = resolve(this.configDir, "k8s-project-config.yml");

    if (!byPass && existsSync(configFile)) {
      throw new BadRequestException(`Project "${this.config.name}" already initialized`);
    }

    return writeFile(configFile, dump(this.config));
  }

  getConfig() {
    return this.config as ProjectConfig;
  }
}
