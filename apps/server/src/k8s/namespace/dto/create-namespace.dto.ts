import { createZodDto } from "nestjs-zod";

import { createNamespaceSchema } from "@k8sd/shared";

export class CreateNamespaceDto extends createZodDto(createNamespaceSchema) {}
