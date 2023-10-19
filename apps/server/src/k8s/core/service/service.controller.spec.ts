import { Test, TestingModule } from "@nestjs/testing";

import { ServiceController } from "./service.controller";

describe("ServiceController", () => {
  let serviceController: ServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceController]
    }).compile();

    serviceController = module.get<ServiceController>(ServiceController);
  });

  it("should be defined", () => {
    expect(serviceController).toBeDefined();
  });
});
