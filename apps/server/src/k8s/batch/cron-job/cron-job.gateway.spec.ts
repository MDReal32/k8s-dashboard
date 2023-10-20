import { Test, TestingModule } from "@nestjs/testing";

import { CronJobGateway } from "./cron-job.gateway";

describe("CronJobGateway", () => {
  let cronJobGateway: CronJobGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CronJobGateway]
    }).compile();

    cronJobGateway = module.get<CronJobGateway>(CronJobGateway);
  });

  it("should be defined", () => {
    expect(cronJobGateway).toBeDefined();
  });
});