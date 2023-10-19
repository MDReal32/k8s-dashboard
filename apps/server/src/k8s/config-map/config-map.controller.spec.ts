import { Test, TestingModule } from "@nestjs/testing";

import { ConfigMapController } from "./config-map.controller";

describe("ConfigMapController", () => {
  let configMapController: ConfigMapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigMapController]
    }).compile();

    configMapController = module.get<ConfigMapController>(ConfigMapController);
  });

  it("should be defined", () => {
    expect(configMapController).toBeDefined();
  });
});
