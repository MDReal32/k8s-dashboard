import { Test, TestingModule } from "@nestjs/testing";

import { IngressService } from "./ingress.service";

describe("IngressService", () => {
  let ingressService: IngressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IngressService]
    }).compile();

    ingressService = module.get<IngressService>(IngressService);
  });

  it("should be defined", () => {
    expect(ingressService).toBeDefined();
  });
});
