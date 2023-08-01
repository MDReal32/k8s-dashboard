import { createZodDto } from "nestjs-zod";

import { projectUpdateSchema } from "@ugrab/k8s-shared";

export class ProjectUpdateDto extends createZodDto(projectUpdateSchema) {}
