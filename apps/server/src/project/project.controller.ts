import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";

import { ProjectService } from "./project.service";
import { ProjectInitDto } from "./dto/project-init.dto";
import { BaseController } from "../base/base.controller";
import { ProjectUpdateDto } from "./dto/project-update.dto";

@Controller("v1/project")
export class ProjectController extends BaseController {
  constructor(private readonly projectService: ProjectService) {
    super(projectService);
  }

  // ToDO: implement getting all my projects over
  //       token after implementing auth

  @Get(":id")
  get(@Param("id") id: string) {
    return this.projectService.get(id);
  }

  @Post("init")
  init(@Body() projectOptions: ProjectInitDto) {
    return this.projectService.init(projectOptions);
  }

  @Post(":id/setup")
  setup(@Param("id") id: string) {
    return this.projectService.setup(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() data: Partial<ProjectUpdateDto>) {
    return this.projectService.update(id, data);
  }
}
