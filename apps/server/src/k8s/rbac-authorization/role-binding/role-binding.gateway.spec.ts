import { Test, TestingModule } from "@nestjs/testing";

import { RoleBindingGateway } from "./role-binding.gateway";

describe("RoleBindingGateway", () => {
  let roleBindingGateway: RoleBindingGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleBindingGateway]
    }).compile();

    roleBindingGateway = module.get<RoleBindingGateway>(RoleBindingGateway);
  });

  it("should be defined", () => {
    expect(roleBindingGateway).toBeDefined();
  });
});
