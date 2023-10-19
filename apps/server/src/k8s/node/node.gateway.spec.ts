import { Test, TestingModule } from "@nestjs/testing";

import { NodeGateway } from "./node.gateway";

describe("NodeGateway", () => {
  let nodeGateway: NodeGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NodeGateway]
    }).compile();

    nodeGateway = module.get<NodeGateway>(NodeGateway);
  });

  it("should be defined", () => {
    expect(nodeGateway).toBeDefined();
  });
});
