import { Test, TestingModule } from "@nestjs/testing";
import { StatefulSetService } from "./stateful-set.service";

describe("StatefulSetService", () => {
  let service: StatefulSetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatefulSetService]
    }).compile();

    service = module.get<StatefulSetService>(StatefulSetService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
