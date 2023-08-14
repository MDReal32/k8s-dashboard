import { Test, TestingModule } from "@nestjs/testing";
import { StatefulSetController } from "./stateful-set.controller";

describe("StatefulSetController", () => {
  let controller: StatefulSetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatefulSetController]
    }).compile();

    controller = module.get<StatefulSetController>(StatefulSetController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
