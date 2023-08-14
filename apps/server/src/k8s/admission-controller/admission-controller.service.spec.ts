import { Test, TestingModule } from "@nestjs/testing";
import { AdmissionControllerService } from "./admission-controller.service";

describe("AdmissionControllerService", () => {
  let service: AdmissionControllerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdmissionControllerService]
    }).compile();

    service = module.get<AdmissionControllerService>(AdmissionControllerService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
