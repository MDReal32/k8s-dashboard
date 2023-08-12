import { createZodDto } from "nestjs-zod";

import { projectInitSchema } from "@k8sd/shared";

export class ProjectInitDto extends createZodDto(projectInitSchema) {}
