import { Test, TestingModule } from "@nestjs/testing";

import { ReplicaSetService } from "./replica-set.service";

describe("ReplicaSetService", () => {
  let replicaSetService: ReplicaSetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReplicaSetService]
    }).compile();

    replicaSetService = module.get<ReplicaSetService>(ReplicaSetService);
  });

  it("should be defined", () => {
    expect(replicaSetService).toBeDefined();
  });
});