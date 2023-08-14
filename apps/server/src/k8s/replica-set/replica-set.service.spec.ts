import { Test, TestingModule } from "@nestjs/testing";
import { ReplicaSetService } from "./replica-set.service";

describe("ReplicaSetService", () => {
  let service: ReplicaSetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReplicaSetService]
    }).compile();

    service = module.get<ReplicaSetService>(ReplicaSetService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
