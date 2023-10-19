import { Test, TestingModule } from "@nestjs/testing";

import { SecretGateway } from "./secret.gateway";

describe("SecretGateway", () => {
  let secretGateway: SecretGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecretGateway]
    }).compile();

    secretGateway = module.get<SecretGateway>(SecretGateway);
  });

  it("should be defined", () => {
    expect(secretGateway).toBeDefined();
  });
});
