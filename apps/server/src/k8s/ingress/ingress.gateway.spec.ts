import { Test, TestingModule } from "@nestjs/testing";

import { IngressGateway } from "./ingress.gateway";

describe("IngressGateway", () => {
  let gateway: IngressGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IngressGateway]
    }).compile();

    gateway = module.get<IngressGateway>(IngressGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
