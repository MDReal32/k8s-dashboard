import { Test, TestingModule } from "@nestjs/testing";
import { AdmissionControllerGateway } from "./admission-controller.gateway";

describe("AdmissionControllerGateway", () => {
  let gateway: AdmissionControllerGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdmissionControllerGateway]
    }).compile();

    gateway = module.get<AdmissionControllerGateway>(AdmissionControllerGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
