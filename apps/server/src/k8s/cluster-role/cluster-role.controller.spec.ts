import { Test, TestingModule } from "@nestjs/testing";
import { ClusterRoleController } from "./cluster-role.controller";

describe("ClusterRoleController", () => {
  let controller: ClusterRoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClusterRoleController]
    }).compile();

    controller = module.get<ClusterRoleController>(ClusterRoleController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
