import { Body, Controller, Param, Patch, Post } from "@nestjs/common";

import { ProjectService } from "./project.service";
import { ProjectInitDto } from "./dto/project-init.dto";
import { ProjectUpdateDto } from "./dto/project-update.dto";

@Controller("v1/project")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post("init")
  init(@Body() projectOptions: ProjectInitDto) {
    return this.projectService.init(projectOptions);
  }

  @Patch(":name/update")
  update(@Param("name") name: string, @Body() projectOptions: Partial<ProjectUpdateDto>) {
    return this.projectService.update(name, projectOptions);
  }

  @Post(":name/setup")
  setup(@Param("name") name: string) {
    return this.projectService.setup(name);
  }
}