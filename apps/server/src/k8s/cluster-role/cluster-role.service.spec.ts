import { Test, TestingModule } from "@nestjs/testing";
import { ClusterRoleService } from "./cluster-role.service";

describe("ClusterRoleService", () => {
  let service: ClusterRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClusterRoleService]
    }).compile();

    service = module.get<ClusterRoleService>(ClusterRoleService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
