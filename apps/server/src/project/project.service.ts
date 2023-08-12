import { BadRequestException, Injectable } from "@nestjs/common";

import { Logger, WS_EVENTS } from "@k8sd/shared";

import { ProjectInitDto } from "./dto/project-init.dto";
import { ProjectUpdateDto } from "./dto/project-update.dto";
import { BaseService } from "../base/base.service";

@Injectable()
export class ProjectService extends BaseService {
  private readonly logger = new Logger("ProjectService");

  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async init(options: ProjectInitDto) {
    // const repo = options.repositoryUrl.match(GITHUB_VALIDATE_RE);
    // if (!repo) {
    //   throw new BadRequestException("Invalid repository url");
    // }
    // await new Config().set(options).saveConfig();
    // return { status: "ok" };
  }

  async update(name: string, options: Partial<ProjectUpdateDto>) {
    // if ("name" in options) delete options.name;
    // const config = new Config();
    //
    // try {
    //   await config.loadConfig(name);
    //   config.set(options);
    //   await config.saveConfig(true);
    //
    //   return { status: "ok" };
    // } catch (err) {
    //   this.logger.error(err);
    //   throw new BadRequestException("Project didn't initialized", { cause: err });
    // }
  }

  async setup(name: string) {
    // const config = new Config();
    // try {
    //   await config.loadConfig(name);
    // } catch (err) {
    //   this.logger.error(err);
    //   throw new BadRequestException("Project didn't initialized", { cause: err });
    // }
    //
    // if (config.setupDone) {
    //   throw new BadRequestException(`Project ${name} already setuped`);
    // }
    //
    // await this.gitService.clone(config.repoUrl, {
    //   name: config.name,
    //   branch: config.branch,
    //   cwd: config.repoDir
    // });
    //
    // this.logger.log(
    //   `Copying CI files from ${config.ciDir} to ${resolve(config.configDir, "helm")}`
    // );
    // await cp(config.ciDir, resolve(config.configDir, "helm"), { recursive: true });
    // config.setDone(true);
    // await config.saveConfig(true);
    //
    // return { status: "ok" };
  }
}
