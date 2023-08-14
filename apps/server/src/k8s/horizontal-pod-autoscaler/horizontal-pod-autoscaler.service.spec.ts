import { Test, TestingModule } from "@nestjs/testing";
import { HorizontalPodAutoscalerService } from "./horizontal-pod-autoscaler.service";

describe("HorizontalPodAutoscalerService", () => {
  let service: HorizontalPodAutoscalerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HorizontalPodAutoscalerService]
    }).compile();

    service = module.get<HorizontalPodAutoscalerService>(HorizontalPodAutoscalerService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
