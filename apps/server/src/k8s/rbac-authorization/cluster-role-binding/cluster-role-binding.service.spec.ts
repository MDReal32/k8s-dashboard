import { Test, TestingModule } from "@nestjs/testing";

import { ClusterRoleBindingService } from "./cluster-role-binding.service";

describe("ClusterRoleBindingService", () => {
  let clusterRoleBindingService: ClusterRoleBindingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClusterRoleBindingService]
    }).compile();

    clusterRoleBindingService = module.get<ClusterRoleBindingService>(ClusterRoleBindingService);
  });

  it("should be defined", () => {
    expect(clusterRoleBindingService).toBeDefined();
  });
});
