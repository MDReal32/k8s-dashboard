import { Test, TestingModule } from "@nestjs/testing";

import { NamespaceService } from "./namespace.service";

describe("NamespaceService", () => {
  let namespaceService: NamespaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NamespaceService]
    }).compile();

    namespaceService = module.get<NamespaceService>(NamespaceService);
  });

  it("should be defined", () => {
    expect(namespaceService).toBeDefined();
  });
});