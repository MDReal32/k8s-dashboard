import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogGateway } from './log.gateway';
import { LogController } from './log.controller';

@Module({
  providers: [LogService, LogGateway],
  controllers: [LogController]
})
export class LogModule {}
