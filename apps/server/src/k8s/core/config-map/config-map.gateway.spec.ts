import { Test, TestingModule } from "@nestjs/testing";

import { ConfigMapGateway } from "./config-map.gateway";

describe("ConfigMapGateway", () => {
  let configMapGateway: ConfigMapGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigMapGateway]
    }).compile();

    configMapGateway = module.get<ConfigMapGateway>(ConfigMapGateway);
  });

  it("should be defined", () => {
    expect(configMapGateway).toBeDefined();
  });
});