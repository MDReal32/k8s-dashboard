import { Test, TestingModule } from "@nestjs/testing";

import { NodeService } from "./node.service";

describe("NodeService", () => {
  let nodeService: NodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NodeService]
    }).compile();

    nodeService = module.get<NodeService>(NodeService);
  });

  it("should be defined", () => {
    expect(nodeService).toBeDefined();
  });
});
