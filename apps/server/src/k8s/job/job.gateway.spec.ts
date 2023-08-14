import { Test, TestingModule } from "@nestjs/testing";
import { JobGateway } from "./job.gateway";

describe("JobGateway", () => {
  let gateway: JobGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobGateway]
    }).compile();

    gateway = module.get<JobGateway>(JobGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
