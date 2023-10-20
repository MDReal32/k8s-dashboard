import { Test, TestingModule } from "@nestjs/testing";

import { ServiceAccountGateway } from "./service-account.gateway";

describe("ServiceAccountGateway", () => {
  let serviceAccountGateway: ServiceAccountGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceAccountGateway]
    }).compile();

    serviceAccountGateway = module.get<ServiceAccountGateway>(ServiceAccountGateway);
  });

  it("should be defined", () => {
    expect(serviceAccountGateway).toBeDefined();
  });
});