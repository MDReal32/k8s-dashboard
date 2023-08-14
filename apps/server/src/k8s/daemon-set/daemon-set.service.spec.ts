import { Test, TestingModule } from "@nestjs/testing";
import { DaemonSetService } from "./daemon-set.service";

describe("DaemonSetService", () => {
  let service: DaemonSetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DaemonSetService]
    }).compile();

    service = module.get<DaemonSetService>(DaemonSetService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
