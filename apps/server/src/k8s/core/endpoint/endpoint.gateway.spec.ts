import { Test, TestingModule } from "@nestjs/testing";

import { EndpointGateway } from "./endpoint.gateway";

describe("EndpointGateway", () => {
  let endpointGateway: EndpointGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EndpointGateway]
    }).compile();

    endpointGateway = module.get<EndpointGateway>(EndpointGateway);
  });

  it("should be defined", () => {
    expect(endpointGateway).toBeDefined();
  });
});