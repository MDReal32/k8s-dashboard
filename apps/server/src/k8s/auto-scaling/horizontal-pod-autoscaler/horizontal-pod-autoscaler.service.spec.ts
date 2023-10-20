import { Test, TestingModule } from "@nestjs/testing";

import { HorizontalPodAutoscalerService } from "./horizontal-pod-autoscaler.service";

describe("HorizontalPodAutoscalerService", () => {
  let horizontalPodAutoscalerService: HorizontalPodAutoscalerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HorizontalPodAutoscalerService]
    }).compile();

    horizontalPodAutoscalerService = module.get<HorizontalPodAutoscalerService>(
      HorizontalPodAutoscalerService
    );
  });

  it("should be defined", () => {
    expect(horizontalPodAutoscalerService).toBeDefined();
  });
});
