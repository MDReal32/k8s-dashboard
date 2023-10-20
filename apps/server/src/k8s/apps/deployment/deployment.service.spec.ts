import { Test, TestingModule } from "@nestjs/testing";

import { DeploymentService } from "./deployment.service";

describe("DeploymentService", () => {
  let deploymentService: DeploymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeploymentService]
    }).compile();

    deploymentService = module.get<DeploymentService>(DeploymentService);
  });

  it("should be defined", () => {
    expect(deploymentService).toBeDefined();
  });
});