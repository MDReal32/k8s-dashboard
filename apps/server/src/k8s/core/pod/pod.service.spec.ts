import { Test, TestingModule } from "@nestjs/testing";

import { PodService } from "./pod.service";

describe("PodService", () => {
  let podService: PodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PodService]
    }).compile();

    podService = module.get<PodService>(PodService);
  });

  it("should be defined", () => {
    expect(podService).toBeDefined();
  });
});
