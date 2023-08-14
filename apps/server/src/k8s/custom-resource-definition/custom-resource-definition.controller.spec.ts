import { Test, TestingModule } from "@nestjs/testing";
import { CustomResourceDefinitionController } from "./custom-resource-definition.controller";

describe("CustomResourceDefinitionController", () => {
  let controller: CustomResourceDefinitionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomResourceDefinitionController]
    }).compile();

    controller = module.get<CustomResourceDefinitionController>(CustomResourceDefinitionController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
