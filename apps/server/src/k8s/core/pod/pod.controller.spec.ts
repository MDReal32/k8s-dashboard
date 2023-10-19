import { Test, TestingModule } from "@nestjs/testing";

import { PodController } from "./pod.controller";

describe("PodController", () => {
  let podController: PodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PodController]
    }).compile();

    podController = module.get<PodController>(PodController);
  });

  it("should be defined", () => {
    expect(podController).toBeDefined();
  });
});
