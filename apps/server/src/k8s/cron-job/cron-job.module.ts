import { Module } from "@nestjs/common";
import { CronJobController } from "./cron-job.controller";
import { CronJobGateway } from "./cron-job.gateway";
import { CronJobService } from "./cron-job.service";

@Module({
  controllers: [CronJobController],
  providers: [CronJobGateway, CronJobService]
})
export class CronJobModule {}
