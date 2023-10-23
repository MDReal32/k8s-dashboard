import { Module } from "@nestjs/common";

import { PrismaCoreModule } from "../prisma/prisma-core/prisma-core.module";
import { ProjectController } from "./project.controller";
import { ProjectGateway } from "./project.gateway";
import { ProjectService } from "./project.service";

@Module({
  imports: [PrismaCoreModule],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectGateway]
})
export class ProjectModule {}
