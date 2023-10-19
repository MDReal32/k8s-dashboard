import { Test, TestingModule } from "@nestjs/testing";

import { RoleController } from "./role.controller";

describe("RoleController", () => {
  let roleController: RoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleController]
    }).compile();

    roleController = module.get<RoleController>(RoleController);
  });

  it("should be defined", () => {
    expect(roleController).toBeDefined();
  });
});
