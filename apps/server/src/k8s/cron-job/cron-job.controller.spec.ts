import { Test, TestingModule } from "@nestjs/testing";

import { CronJobController } from "./cron-job.controller";

describe("CronJobController", () => {
  let cronJobController: CronJobController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CronJobController]
    }).compile();

    cronJobController = module.get<CronJobController>(CronJobController);
  });

  it("should be defined", () => {
    expect(cronJobController).toBeDefined();
  });
});
