import { Test, TestingModule } from "@nestjs/testing";

import { NamespaceGateway } from "./namespace.gateway";

describe("NamespaceGateway", () => {
  let gateway: NamespaceGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NamespaceGateway]
    }).compile();

    gateway = module.get<NamespaceGateway>(NamespaceGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
