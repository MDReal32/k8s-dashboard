import { BadRequestException, Injectable } from "@nestjs/common";
import { merge } from "lodash";

import { Logger, WS_EVENTS } from "@k8sd/shared";

import { ProjectInitDto } from "./dto/project-init.dto";
import { ProjectUpdateDto } from "./dto/project-update.dto";
import { BaseService } from "../base/base.service";
import { projectDefaultOptions } from "./project.const";

@Injectable()
export class ProjectService extends BaseService {
  private readonly logger = new Logger("ProjectService");

  constructor(private readonly prisma: PrismaService) {
    super();
  }

  get(id: string) {
    return this.prisma.project
      .findUnique({
        where: { id },
        include: { repo: true, ci: true }
      })
      .catch(err => {
        this.logger.error(err);
        throw new BadRequestException(`Project ${id} not found`, { cause: err });
      })
      .then(foundProject => {
        if (!foundProject) throw new BadRequestException(`Project ${id} didn't initialized`);
        return foundProject;
      })
      .catch(err => {
        this.logger.error(err);
        throw err;
      });
  }

  async init(userOptions: ProjectInitDto) {
    const options = merge({}, projectDefaultOptions, userOptions);
    const found = await this.prisma.project.findFirst({ where: { name: options.name } });
    if (found) {
      throw new BadRequestException({
        id: found.id,
        message: `Project ${options.name} already initialized`
      });
    }

    return this.prisma.project
      .create({
        include: { repo: true, ci: true },
        data: this.toCreate(options)
      })
      .catch(err => {
        this.logger.error(err);
        throw new BadRequestException(`Project ${options.name} didn't initialized`, { cause: err });
      });
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
