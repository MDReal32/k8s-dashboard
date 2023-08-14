import { Test, TestingModule } from "@nestjs/testing";
import { NetworkPolicyGateway } from "./network-policy.gateway";

describe("NetworkPolicyGateway", () => {
  let gateway: NetworkPolicyGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NetworkPolicyGateway]
    }).compile();

    gateway = module.get<NetworkPolicyGateway>(NetworkPolicyGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
