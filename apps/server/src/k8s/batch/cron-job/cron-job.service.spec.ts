import { Test, TestingModule } from "@nestjs/testing";

import { CronJobService } from "./cron-job.service";

describe("CronJobService", () => {
  let cronJobService: CronJobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CronJobService]
    }).compile();

    cronJobService = module.get<CronJobService>(CronJobService);
  });

  it("should be defined", () => {
    expect(cronJobService).toBeDefined();
  });
});