import { Test, TestingModule } from "@nestjs/testing";

import { RoleGateway } from "./role.gateway";

describe("RoleGateway", () => {
  let roleGateway: RoleGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleGateway]
    }).compile();

    roleGateway = module.get<RoleGateway>(RoleGateway);
  });

  it("should be defined", () => {
    expect(roleGateway).toBeDefined();
  });
});
