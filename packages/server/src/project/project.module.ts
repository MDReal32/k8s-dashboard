import { Module } from "@nestjs/common";
import { ProjectController } from "./project.controller";
import { ProjectService } from "./project.service";
import { ProjectGateway } from "./project.gateway";
import { GitModule } from "../git/git.module";

@Module({
  imports: [GitModule],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectGateway]
})
export class ProjectModule {}
