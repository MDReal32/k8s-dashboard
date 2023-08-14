import { Test, TestingModule } from "@nestjs/testing";
import { NetworkPolicyController } from "./network-policy.controller";

describe("NetworkPolicyController", () => {
  let controller: NetworkPolicyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NetworkPolicyController]
    }).compile();

    controller = module.get<NetworkPolicyController>(NetworkPolicyController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
