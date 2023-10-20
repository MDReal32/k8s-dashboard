import { Test, TestingModule } from "@nestjs/testing";

import { SecretService } from "./secret.service";

describe("SecretService", () => {
  let secretService: SecretService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecretService]
    }).compile();

    secretService = module.get<SecretService>(SecretService);
  });

  it("should be defined", () => {
    expect(secretService).toBeDefined();
  });
});