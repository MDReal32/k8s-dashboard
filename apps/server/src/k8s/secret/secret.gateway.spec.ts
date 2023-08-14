import { Test, TestingModule } from "@nestjs/testing";
import { SecretGateway } from "./secret.gateway";

describe("SecretGateway", () => {
  let gateway: SecretGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecretGateway]
    }).compile();

    gateway = module.get<SecretGateway>(SecretGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
