import { createZodDto } from "nestjs-zod";

import { logSchema } from "@k8sd/shared";

export class LogDto extends createZodDto(logSchema) {}
