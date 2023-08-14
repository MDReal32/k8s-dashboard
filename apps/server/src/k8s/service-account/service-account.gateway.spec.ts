import { Test, TestingModule } from "@nestjs/testing";
import { ServiceAccountGateway } from "./service-account.gateway";

describe("ServiceAccountGateway", () => {
  let gateway: ServiceAccountGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceAccountGateway]
    }).compile();

    gateway = module.get<ServiceAccountGateway>(ServiceAccountGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
