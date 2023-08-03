import { createZodDto } from "nestjs-zod";

import { logHeadersSchema } from "@ugrab/k8s-shared";

export class LogHeaderDto extends createZodDto(logHeadersSchema) {}
