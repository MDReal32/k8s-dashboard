import { Test, TestingModule } from "@nestjs/testing";

import { DaemonSetGateway } from "./daemon-set.gateway";

describe("DaemonSetGateway", () => {
  let daemonSetGateway: DaemonSetGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DaemonSetGateway]
    }).compile();

    daemonSetGateway = module.get<DaemonSetGateway>(DaemonSetGateway);
  });

  it("should be defined", () => {
    expect(daemonSetGateway).toBeDefined();
  });
});
