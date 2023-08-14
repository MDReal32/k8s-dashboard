import { Test, TestingModule } from "@nestjs/testing";
import { ClusterRoleGateway } from "./cluster-role.gateway";

describe("ClusterRoleGateway", () => {
  let gateway: ClusterRoleGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClusterRoleGateway]
    }).compile();

    gateway = module.get<ClusterRoleGateway>(ClusterRoleGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
