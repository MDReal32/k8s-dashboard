import { Module } from "@nestjs/common";

import { PrismaCoreModule } from "./prisma-core/prisma-core.module";
import { PrismaLogsModule } from "./prisma-logs/prisma-logs.module";

@Module({
  imports: [PrismaCoreModule, PrismaLogsModule]
})
export class PrismaModule {}
