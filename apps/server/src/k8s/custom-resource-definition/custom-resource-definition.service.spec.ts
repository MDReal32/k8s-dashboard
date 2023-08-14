import { Test, TestingModule } from "@nestjs/testing";
import { CustomResourceDefinitionService } from "./custom-resource-definition.service";

describe("CustomResourceDefinitionService", () => {
  let service: CustomResourceDefinitionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomResourceDefinitionService]
    }).compile();

    service = module.get<CustomResourceDefinitionService>(CustomResourceDefinitionService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
