import { Test, TestingModule } from "@nestjs/testing";

import { ClusterRoleBindingController } from "./cluster-role-binding.controller";

describe("ClusterRoleBindingController", () => {
  let clusterRoleBindingController: ClusterRoleBindingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClusterRoleBindingController]
    }).compile();

    clusterRoleBindingController = module.get<ClusterRoleBindingController>(
      ClusterRoleBindingController
    );
  });

  it("should be defined", () => {
    expect(clusterRoleBindingController).toBeDefined();
  });
});
