import { Test, TestingModule } from "@nestjs/testing";

import { SecretController } from "./secret.controller";

describe("SecretController", () => {
  let secretController: SecretController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecretController]
    }).compile();

    secretController = module.get<SecretController>(SecretController);
  });

  it("should be defined", () => {
    expect(secretController).toBeDefined();
  });
});