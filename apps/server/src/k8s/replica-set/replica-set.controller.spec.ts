import { Test, TestingModule } from "@nestjs/testing";

import { ReplicaSetController } from "./replica-set.controller";

describe("ReplicaSetController", () => {
  let controller: ReplicaSetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReplicaSetController]
    }).compile();

    controller = module.get<ReplicaSetController>(ReplicaSetController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
