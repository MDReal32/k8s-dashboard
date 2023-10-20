import { Test, TestingModule } from "@nestjs/testing";

import { ServiceAccountService } from "./service-account.service";

describe("ServiceAccountService", () => {
  let serviceAccountService: ServiceAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceAccountService]
    }).compile();

    serviceAccountService = module.get<ServiceAccountService>(ServiceAccountService);
  });

  it("should be defined", () => {
    expect(serviceAccountService).toBeDefined();
  });
});