import { createZodDto } from "nestjs-zod";

import { projectInitSchema } from "@ugrab/k8s-shared";

export class ProjectInitDto extends createZodDto(projectInitSchema) {}
