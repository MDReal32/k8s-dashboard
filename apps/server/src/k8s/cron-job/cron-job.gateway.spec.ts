import { Test, TestingModule } from "@nestjs/testing";
import { CronJobGateway } from "./cron-job.gateway";

describe("CronJobGateway", () => {
  let gateway: CronJobGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CronJobGateway]
    }).compile();

    gateway = module.get<CronJobGateway>(CronJobGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
