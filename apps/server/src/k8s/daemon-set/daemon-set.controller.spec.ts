import { Test, TestingModule } from "@nestjs/testing";

import { DaemonSetController } from "./daemon-set.controller";

describe("DaemonSetController", () => {
  let controller: DaemonSetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DaemonSetController]
    }).compile();

    controller = module.get<DaemonSetController>(DaemonSetController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
