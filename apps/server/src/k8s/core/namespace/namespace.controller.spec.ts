import { Test, TestingModule } from "@nestjs/testing";

import { NamespaceController } from "./namespace.controller";

describe("NamespaceController", () => {
  let namespaceController: NamespaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NamespaceController]
    }).compile();

    namespaceController = module.get<NamespaceController>(NamespaceController);
  });

  it("should be defined", () => {
    expect(namespaceController).toBeDefined();
  });
});