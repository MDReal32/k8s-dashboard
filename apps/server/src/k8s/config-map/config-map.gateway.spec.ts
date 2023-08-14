import { Test, TestingModule } from "@nestjs/testing";
import { ConfigMapGateway } from "./config-map.gateway";

describe("ConfigMapGateway", () => {
  let gateway: ConfigMapGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigMapGateway]
    }).compile();

    gateway = module.get<ConfigMapGateway>(ConfigMapGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
