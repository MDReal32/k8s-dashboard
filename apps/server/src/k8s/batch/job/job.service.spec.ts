import { Test, TestingModule } from "@nestjs/testing";

import { JobService } from "./job.service";

describe("JobService", () => {
  let jobService: JobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobService]
    }).compile();

    jobService = module.get<JobService>(JobService);
  });

  it("should be defined", () => {
    expect(jobService).toBeDefined();
  });
});