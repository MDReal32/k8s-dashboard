import { Test, TestingModule } from "@nestjs/testing";

import { RoleBindingController } from "./role-binding.controller";

describe("RoleBindingController", () => {
  let roleBindingController: RoleBindingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleBindingController]
    }).compile();

    roleBindingController = module.get<RoleBindingController>(RoleBindingController);
  });

  it("should be defined", () => {
    expect(roleBindingController).toBeDefined();
  });
});
