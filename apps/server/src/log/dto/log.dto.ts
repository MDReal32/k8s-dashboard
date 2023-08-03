import { createZodDto } from "nestjs-zod";

import { logSchema } from "@ugrab/k8s-shared";

export class LogDto extends createZodDto(logSchema) {}
