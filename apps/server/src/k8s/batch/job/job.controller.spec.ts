import { Test, TestingModule } from "@nestjs/testing";

import { JobController } from "./job.controller";

describe("JobController", () => {
  let jobController: JobController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobController]
    }).compile();

    jobController = module.get<JobController>(JobController);
  });

  it("should be defined", () => {
    expect(jobController).toBeDefined();
  });
});