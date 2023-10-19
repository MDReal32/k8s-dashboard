import { Test, TestingModule } from "@nestjs/testing";

import { HorizontalPodAutoscalerController } from "./horizontal-pod-autoscaler.controller";

describe("HorizontalPodAutoscalerController", () => {
  let horizontalPodAutoscalerController: HorizontalPodAutoscalerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HorizontalPodAutoscalerController]
    }).compile();

    horizontalPodAutoscalerController = module.get<HorizontalPodAutoscalerController>(
      HorizontalPodAutoscalerController
    );
  });

  it("should be defined", () => {
    expect(horizontalPodAutoscalerController).toBeDefined();
  });
});
