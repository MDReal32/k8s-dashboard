import { Test, TestingModule } from "@nestjs/testing";

import { IngressController } from "./ingress.controller";

describe("IngressController", () => {
  let ingressController: IngressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngressController]
    }).compile();

    ingressController = module.get<IngressController>(IngressController);
  });

  it("should be defined", () => {
    expect(ingressController).toBeDefined();
  });
});
