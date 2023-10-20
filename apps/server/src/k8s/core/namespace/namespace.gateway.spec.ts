import { Test, TestingModule } from "@nestjs/testing";

import { NamespaceGateway } from "./namespace.gateway";

describe("NamespaceGateway", () => {
  let namespaceGateway: NamespaceGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NamespaceGateway]
    }).compile();

    namespaceGateway = module.get<NamespaceGateway>(NamespaceGateway);
  });

  it("should be defined", () => {
    expect(namespaceGateway).toBeDefined();
  });
});