import { Test, TestingModule } from "@nestjs/testing";
import { VerticalPodAutoscalerService } from "./vertical-pod-autoscaler.service";

describe("VerticalPodAutoscalerService", () => {
  let service: VerticalPodAutoscalerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerticalPodAutoscalerService]
    }).compile();

    service = module.get<VerticalPodAutoscalerService>(VerticalPodAutoscalerService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
