import { Logger, Module } from "@nestjs/common";

import { BatchService } from "./batch.service";
import { CronJobModule } from "./cron-job/cron-job.module";
import { JobModule } from "./job/job.module";

@Module({
  imports: [CronJobModule, JobModule],
  providers: [BatchService, Logger],
  exports: [BatchService]
})
export class BatchModule {}
