import { Test, TestingModule } from "@nestjs/testing";

import { StatefulSetController } from "./stateful-set.controller";

describe("StatefulSetController", () => {
  let statefulSetController: StatefulSetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatefulSetController]
    }).compile();

    statefulSetController = module.get<StatefulSetController>(StatefulSetController);
  });

  it("should be defined", () => {
    expect(statefulSetController).toBeDefined();
  });
});