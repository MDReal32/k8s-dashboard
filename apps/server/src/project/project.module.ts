import { Module } from "@nestjs/common";
import { PrismaModule } from "nestjs-prisma";

import { ProjectController } from "./project.controller";
import { ProjectService } from "./project.service";
import { ProjectGateway } from "./project.gateway";

@Module({
  imports: [PrismaModule],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectGateway]
})
export class ProjectModule {}
