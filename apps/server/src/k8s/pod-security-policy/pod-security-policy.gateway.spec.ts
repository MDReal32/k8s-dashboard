import { Test, TestingModule } from "@nestjs/testing";
import { PodSecurityPolicyGateway } from "./pod-security-policy.gateway";

describe("PodSecurityPolicyGateway", () => {
  let gateway: PodSecurityPolicyGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PodSecurityPolicyGateway]
    }).compile();

    gateway = module.get<PodSecurityPolicyGateway>(PodSecurityPolicyGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
