import { Test, TestingModule } from "@nestjs/testing";

import { DaemonSetController } from "./daemon-set.controller";

describe("DaemonSetController", () => {
  let daemonSetController: DaemonSetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DaemonSetController]
    }).compile();

    daemonSetController = module.get<DaemonSetController>(DaemonSetController);
  });

  it("should be defined", () => {
    expect(daemonSetController).toBeDefined();
  });
});