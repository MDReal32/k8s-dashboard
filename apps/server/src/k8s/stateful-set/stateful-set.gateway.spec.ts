import { Test, TestingModule } from "@nestjs/testing";

import { StatefulSetGateway } from "./stateful-set.gateway";

describe("StatefulSetGateway", () => {
  let gateway: StatefulSetGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatefulSetGateway]
    }).compile();

    gateway = module.get<StatefulSetGateway>(StatefulSetGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
