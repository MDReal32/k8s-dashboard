import { Test, TestingModule } from "@nestjs/testing";

import { ConfigMapService } from "./config-map.service";

describe("ConfigMapService", () => {
  let configMapService: ConfigMapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigMapService]
    }).compile();

    configMapService = module.get<ConfigMapService>(ConfigMapService);
  });

  it("should be defined", () => {
    expect(configMapService).toBeDefined();
  });
});