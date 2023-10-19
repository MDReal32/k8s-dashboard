import { Test, TestingModule } from "@nestjs/testing";

import { ServiceAccountController } from "./service-account.controller";

describe("ServiceAccountController", () => {
  let serviceAccountController: ServiceAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceAccountController]
    }).compile();

    serviceAccountController = module.get<ServiceAccountController>(ServiceAccountController);
  });

  it("should be defined", () => {
    expect(serviceAccountController).toBeDefined();
  });
});
