import { Test, TestingModule } from "@nestjs/testing";
import { PodSecurityPolicyService } from "./pod-security-policy.service";

describe("PodSecurityPolicyService", () => {
  let service: PodSecurityPolicyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PodSecurityPolicyService]
    }).compile();

    service = module.get<PodSecurityPolicyService>(PodSecurityPolicyService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
