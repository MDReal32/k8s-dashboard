import { Test, TestingModule } from "@nestjs/testing";

import { DaemonSetService } from "./daemon-set.service";

describe("DaemonSetService", () => {
  let daemonSetService: DaemonSetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DaemonSetService]
    }).compile();

    daemonSetService = module.get<DaemonSetService>(DaemonSetService);
  });

  it("should be defined", () => {
    expect(daemonSetService).toBeDefined();
  });
});