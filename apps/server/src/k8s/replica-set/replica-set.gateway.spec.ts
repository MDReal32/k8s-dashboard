import { Test, TestingModule } from "@nestjs/testing";

import { ReplicaSetGateway } from "./replica-set.gateway";

describe("ReplicaSetGateway", () => {
  let replicaSetGateway: ReplicaSetGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReplicaSetGateway]
    }).compile();

    replicaSetGateway = module.get<ReplicaSetGateway>(ReplicaSetGateway);
  });

  it("should be defined", () => {
    expect(replicaSetGateway).toBeDefined();
  });
});
