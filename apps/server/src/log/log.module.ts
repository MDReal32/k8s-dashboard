import { Module } from "@nestjs/common";

import { PrismaLogsModule } from "../prisma/prisma-logs/prisma-logs.module";
import { LogController } from "./log.controller";
import { LogGateway } from "./log.gateway";
import { LogService } from "./log.service";

@Module({
  imports: [PrismaLogsModule],
  providers: [LogService, LogGateway],
  controllers: [LogController]
})
export class LogModule {}
