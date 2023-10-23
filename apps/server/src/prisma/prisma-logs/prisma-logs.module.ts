import { Module } from "@nestjs/common";

import { PrismaLogsService } from "./prisma-logs.service";

@Module({
  providers: [PrismaLogsService],
  exports: [PrismaLogsService]
})
export class PrismaLogsModule {}
