import { Test, TestingModule } from "@nestjs/testing";
import { VerticalPodAutoscalerGateway } from "./vertical-pod-autoscaler.gateway";

describe("VerticalPodAutoscalerGateway", () => {
  let gateway: VerticalPodAutoscalerGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerticalPodAutoscalerGateway]
    }).compile();

    gateway = module.get<VerticalPodAutoscalerGateway>(VerticalPodAutoscalerGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
