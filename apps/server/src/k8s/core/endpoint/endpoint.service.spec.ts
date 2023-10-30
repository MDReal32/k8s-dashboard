import { Test, TestingModule } from "@nestjs/testing";

import { EndpointService } from "./endpoint.service";

describe("EndpointService", () => {
  let endpointService: EndpointService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EndpointService]
    }).compile();

    endpointService = module.get<EndpointService>(EndpointService);
  });

  it("should be defined", () => {
    expect(endpointService).toBeDefined();
  });
});