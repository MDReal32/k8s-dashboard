import { Test, TestingModule } from "@nestjs/testing";

import { ServiceGateway } from "./service.gateway";

describe("ServiceGateway", () => {
  let gateway: ServiceGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceGateway]
    }).compile();

    gateway = module.get<ServiceGateway>(ServiceGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
