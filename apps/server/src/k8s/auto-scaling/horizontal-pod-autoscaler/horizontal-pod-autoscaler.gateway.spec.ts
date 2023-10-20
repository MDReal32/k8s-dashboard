import { Test, TestingModule } from "@nestjs/testing";

import { HorizontalPodAutoscalerGateway } from "./horizontal-pod-autoscaler.gateway";

describe("HorizontalPodAutoscalerGateway", () => {
  let horizontalPodAutoscalerGateway: HorizontalPodAutoscalerGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HorizontalPodAutoscalerGateway]
    }).compile();

    horizontalPodAutoscalerGateway = module.get<HorizontalPodAutoscalerGateway>(
      HorizontalPodAutoscalerGateway
    );
  });

  it("should be defined", () => {
    expect(horizontalPodAutoscalerGateway).toBeDefined();
  });
});
