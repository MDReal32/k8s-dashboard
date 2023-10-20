import { Test, TestingModule } from "@nestjs/testing";

import { DeploymentGateway } from "./deployment.gateway";

describe("DeploymentGateway", () => {
  let deploymentGateway: DeploymentGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeploymentGateway]
    }).compile();

    deploymentGateway = module.get<DeploymentGateway>(DeploymentGateway);
  });

  it("should be defined", () => {
    expect(deploymentGateway).toBeDefined();
  });
});