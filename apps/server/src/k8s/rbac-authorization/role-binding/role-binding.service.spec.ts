import { Test, TestingModule } from "@nestjs/testing";

import { RoleBindingService } from "./role-binding.service";

describe("RoleBindingService", () => {
  let roleBindingService: RoleBindingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleBindingService]
    }).compile();

    roleBindingService = module.get<RoleBindingService>(RoleBindingService);
  });

  it("should be defined", () => {
    expect(roleBindingService).toBeDefined();
  });
});
