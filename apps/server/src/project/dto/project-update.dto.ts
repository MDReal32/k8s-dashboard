import { createZodDto } from "nestjs-zod";

import { projectUpdateSchema } from "@k8sd/shared";

export class ProjectUpdateDto extends createZodDto(projectUpdateSchema) {}
