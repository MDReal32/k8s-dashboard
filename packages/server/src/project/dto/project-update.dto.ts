import { OmitType } from "@nestjs/swagger";

import { ProjectInitDto } from "./project-init.dto";

export class ProjectUpdateDto extends OmitType(ProjectInitDto, ["name"]) {}
