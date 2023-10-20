import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";

import { BaseController } from "../base/base.controller";
import { ProjectInitDto } from "./dto/project-init.dto";
import { ProjectUpdateDto } from "./dto/project-update.dto";
import { ProjectService } from "./project.service";

@Controller("v1/project")
export class ProjectController extends BaseController {
  constructor(private readonly projectService: ProjectService) {
    super(projectService);
  }

  @Get()
  getProjects() {
    return this.projectService.getProjects();
  }
}
