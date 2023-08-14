import { Test, TestingModule } from "@nestjs/testing";
import { VerticalPodAutoscalerController } from "./vertical-pod-autoscaler.controller";

describe("VerticalPodAutoscalerController", () => {
  let controller: VerticalPodAutoscalerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VerticalPodAutoscalerController]
    }).compile();

    controller = module.get<VerticalPodAutoscalerController>(VerticalPodAutoscalerController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
