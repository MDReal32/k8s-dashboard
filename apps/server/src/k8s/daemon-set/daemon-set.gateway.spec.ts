import { Test, TestingModule } from "@nestjs/testing";
import { DaemonSetGateway } from "./daemon-set.gateway";

describe("DaemonSetGateway", () => {
  let gateway: DaemonSetGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DaemonSetGateway]
    }).compile();

    gateway = module.get<DaemonSetGateway>(DaemonSetGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
