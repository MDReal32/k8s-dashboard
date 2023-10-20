import { Test, TestingModule } from "@nestjs/testing";

import { JobGateway } from "./job.gateway";

describe("JobGateway", () => {
  let jobGateway: JobGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobGateway]
    }).compile();

    jobGateway = module.get<JobGateway>(JobGateway);
  });

  it("should be defined", () => {
    expect(jobGateway).toBeDefined();
  });
});