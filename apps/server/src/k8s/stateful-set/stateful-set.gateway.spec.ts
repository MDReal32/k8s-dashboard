import { Test, TestingModule } from "@nestjs/testing";

import { StatefulSetGateway } from "./stateful-set.gateway";

describe("StatefulSetGateway", () => {
  let statefulSetGateway: StatefulSetGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatefulSetGateway]
    }).compile();

    statefulSetGateway = module.get<StatefulSetGateway>(StatefulSetGateway);
  });

  it("should be defined", () => {
    expect(statefulSetGateway).toBeDefined();
  });
});
