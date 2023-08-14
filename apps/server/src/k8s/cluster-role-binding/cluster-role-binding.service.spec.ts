import { Test, TestingModule } from "@nestjs/testing";
import { ClusterRoleBindingService } from "./cluster-role-binding.service";

describe("ClusterRoleBindingService", () => {
  let service: ClusterRoleBindingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClusterRoleBindingService]
    }).compile();

    service = module.get<ClusterRoleBindingService>(ClusterRoleBindingService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
