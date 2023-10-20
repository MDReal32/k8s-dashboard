import { Test, TestingModule } from "@nestjs/testing";

import { IngressGateway } from "./ingress.gateway";

describe("IngressGateway", () => {
  let ingressGateway: IngressGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IngressGateway]
    }).compile();

    ingressGateway = module.get<IngressGateway>(IngressGateway);
  });

  it("should be defined", () => {
    expect(ingressGateway).toBeDefined();
  });
});
