import { Test, TestingModule } from "@nestjs/testing";

import { ConfigMapController } from "./config-map.controller";

describe("ConfigMapController", () => {
  let controller: ConfigMapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigMapController]
    }).compile();

    controller = module.get<ConfigMapController>(ConfigMapController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
