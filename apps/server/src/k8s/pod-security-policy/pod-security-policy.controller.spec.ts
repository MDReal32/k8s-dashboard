import { Test, TestingModule } from "@nestjs/testing";
import { PodSecurityPolicyController } from "./pod-security-policy.controller";

describe("PodSecurityPolicyController", () => {
  let controller: PodSecurityPolicyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PodSecurityPolicyController]
    }).compile();

    controller = module.get<PodSecurityPolicyController>(PodSecurityPolicyController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
