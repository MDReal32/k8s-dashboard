import { Test, TestingModule } from "@nestjs/testing";

import { ReplicaSetController } from "./replica-set.controller";

describe("ReplicaSetController", () => {
  let replicaSetController: ReplicaSetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReplicaSetController]
    }).compile();

    replicaSetController = module.get<ReplicaSetController>(ReplicaSetController);
  });

  it("should be defined", () => {
    expect(replicaSetController).toBeDefined();
  });
});
