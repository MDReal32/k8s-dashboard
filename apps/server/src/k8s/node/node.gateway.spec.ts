import { Test, TestingModule } from "@nestjs/testing";

import { NodeGateway } from "./node.gateway";

describe("NodeGateway", () => {
  let gateway: NodeGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NodeGateway]
    }).compile();

    gateway = module.get<NodeGateway>(NodeGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
