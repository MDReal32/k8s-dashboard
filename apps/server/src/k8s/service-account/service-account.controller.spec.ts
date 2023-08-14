import { Test, TestingModule } from "@nestjs/testing";
import { ServiceAccountController } from "./service-account.controller";

describe("ServiceAccountController", () => {
  let controller: ServiceAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceAccountController]
    }).compile();

    controller = module.get<ServiceAccountController>(ServiceAccountController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
