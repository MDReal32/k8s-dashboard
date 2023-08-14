import { Test, TestingModule } from "@nestjs/testing";
import { PodGateway } from "./pod.gateway";

describe("PodGateway", () => {
  let gateway: PodGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PodGateway]
    }).compile();

    gateway = module.get<PodGateway>(PodGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
