import { Test, TestingModule } from "@nestjs/testing";

import { DeploymentController } from "./deployment.controller";

describe("DeploymentController", () => {
  let deploymentController: DeploymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeploymentController]
    }).compile();

    deploymentController = module.get<DeploymentController>(DeploymentController);
  });

  it("should be defined", () => {
    expect(deploymentController).toBeDefined();
  });
});