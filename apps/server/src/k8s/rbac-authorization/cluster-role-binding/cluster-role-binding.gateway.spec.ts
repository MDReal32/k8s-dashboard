import { Test, TestingModule } from "@nestjs/testing";

import { ClusterRoleBindingGateway } from "./cluster-role-binding.gateway";

describe("ClusterRoleBindingGateway", () => {
  let clusterRoleBindingGateway: ClusterRoleBindingGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClusterRoleBindingGateway]
    }).compile();

    clusterRoleBindingGateway = module.get<ClusterRoleBindingGateway>(ClusterRoleBindingGateway);
  });

  it("should be defined", () => {
    expect(clusterRoleBindingGateway).toBeDefined();
  });
});
