import { Test, TestingModule } from "@nestjs/testing";
import { AdmissionControllerController } from "./admission-controller.controller";

describe("AdmissionControllerController", () => {
  let controller: AdmissionControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdmissionControllerController]
    }).compile();

    controller = module.get<AdmissionControllerController>(AdmissionControllerController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
