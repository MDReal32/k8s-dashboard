import { Module } from "@nestjs/common";

import { JobController } from "./job.controller";
import { JobGateway } from "./job.gateway";
import { JobService } from "./job.service";


@Module({
  controllers: [JobController],
  providers: [JobGateway, JobService],
  exports: [JobService]
})
export class JobModule {}