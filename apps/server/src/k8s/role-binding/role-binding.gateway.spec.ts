import { Test, TestingModule } from "@nestjs/testing";
import { RoleBindingGateway } from "./role-binding.gateway";

describe("RoleBindingGateway", () => {
  let gateway: RoleBindingGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleBindingGateway]
    }).compile();

    gateway = module.get<RoleBindingGateway>(RoleBindingGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
