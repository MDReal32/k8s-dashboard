import { Test, TestingModule } from "@nestjs/testing";

import { ServiceService } from "./service.service";

describe("ServiceService", () => {
  let serviceService: ServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceService]
    }).compile();

    serviceService = module.get<ServiceService>(ServiceService);
  });

  it("should be defined", () => {
    expect(serviceService).toBeDefined();
  });
});
