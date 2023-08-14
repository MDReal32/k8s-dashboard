import { Test, TestingModule } from "@nestjs/testing";
import { NetworkPolicyService } from "./network-policy.service";

describe("NetworkPolicyService", () => {
  let service: NetworkPolicyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NetworkPolicyService]
    }).compile();

    service = module.get<NetworkPolicyService>(NetworkPolicyService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
