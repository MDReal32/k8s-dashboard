import { Test, TestingModule } from "@nestjs/testing";

import { NodeController } from "./node.controller";

describe("NodeController", () => {
  let nodeController: NodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NodeController]
    }).compile();

    nodeController = module.get<NodeController>(NodeController);
  });

  it("should be defined", () => {
    expect(nodeController).toBeDefined();
  });
});
