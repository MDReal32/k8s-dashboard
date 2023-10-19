import { Test, TestingModule } from "@nestjs/testing";

import { DeploymentGateway } from "./deployment.gateway";

describe("DeploymentGateway", () => {
  let gateway: DeploymentGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeploymentGateway]
    }).compile();

    gateway = module.get<DeploymentGateway>(DeploymentGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
