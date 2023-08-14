import { Test, TestingModule } from "@nestjs/testing";
import { HorizontalPodAutoscalerController } from "./horizontal-pod-autoscaler.controller";

describe("HorizontalPodAutoscalerController", () => {
  let controller: HorizontalPodAutoscalerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HorizontalPodAutoscalerController]
    }).compile();

    controller = module.get<HorizontalPodAutoscalerController>(HorizontalPodAutoscalerController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
