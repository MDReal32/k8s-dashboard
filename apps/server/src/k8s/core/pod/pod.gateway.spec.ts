import { Test, TestingModule } from "@nestjs/testing";

import { PodGateway } from "./pod.gateway";

describe("PodGateway", () => {
  let podGateway: PodGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PodGateway]
    }).compile();

    podGateway = module.get<PodGateway>(PodGateway);
  });

  it("should be defined", () => {
    expect(podGateway).toBeDefined();
  });
});
