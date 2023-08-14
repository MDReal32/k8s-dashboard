import { Test, TestingModule } from "@nestjs/testing";
import { CustomResourceDefinitionGateway } from "./custom-resource-definition.gateway";

describe("CustomResourceDefinitionGateway", () => {
  let gateway: CustomResourceDefinitionGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomResourceDefinitionGateway]
    }).compile();

    gateway = module.get<CustomResourceDefinitionGateway>(CustomResourceDefinitionGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
