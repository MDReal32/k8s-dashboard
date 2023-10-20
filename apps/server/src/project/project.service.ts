import { merge } from "lodash";
import { PrismaService } from "nestjs-prisma";

import { BadRequestException, Injectable, Logger } from "@nestjs/common";

import { WS_EVENTS } from "@k8sd/shared";

import { BaseService } from "../base/base.service";
import { ProjectInitDto } from "./dto/project-init.dto";
import { ProjectUpdateDto } from "./dto/project-update.dto";

@Injectable()
export class ProjectService extends BaseService {
  private readonly logger = new Logger("ProjectService");

  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async getProjects() {
    return this.prisma.project.findMany();
  }
}
