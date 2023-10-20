import { Test, TestingModule } from "@nestjs/testing";

import { ServiceGateway } from "./service.gateway";

describe("ServiceGateway", () => {
  let serviceGateway: ServiceGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceGateway]
    }).compile();

    serviceGateway = module.get<ServiceGateway>(ServiceGateway);
  });

  it("should be defined", () => {
    expect(serviceGateway).toBeDefined();
  });
});