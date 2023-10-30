import { Test, TestingModule } from "@nestjs/testing";

import { EndpointController } from "./endpoint.controller";

describe("EndpointController", () => {
  let endpointController: EndpointController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EndpointController]
    }).compile();

    endpointController = module.get<EndpointController>(EndpointController);
  });

  it("should be defined", () => {
    expect(endpointController).toBeDefined();
  });
});
