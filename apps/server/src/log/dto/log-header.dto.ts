import { createZodDto } from "nestjs-zod";

import { logHeadersSchema } from "@k8sd/shared";

export class LogHeaderDto extends createZodDto(logHeadersSchema) {}
