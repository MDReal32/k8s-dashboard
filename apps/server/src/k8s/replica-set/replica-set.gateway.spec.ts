import { Test, TestingModule } from "@nestjs/testing";
import { ReplicaSetGateway } from "./replica-set.gateway";

describe("ReplicaSetGateway", () => {
  let gateway: ReplicaSetGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReplicaSetGateway]
    }).compile();

    gateway = module.get<ReplicaSetGateway>(ReplicaSetGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
