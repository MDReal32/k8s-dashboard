import { Test, TestingModule } from "@nestjs/testing";

import { StatefulSetService } from "./stateful-set.service";

describe("StatefulSetService", () => {
  let statefulSetService: StatefulSetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatefulSetService]
    }).compile();

    statefulSetService = module.get<StatefulSetService>(StatefulSetService);
  });

  it("should be defined", () => {
    expect(statefulSetService).toBeDefined();
  });
});
