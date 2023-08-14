import { Test, TestingModule } from "@nestjs/testing";
import { ServiceMeshService } from "./service-mesh.service";

describe("ServiceMeshService", () => {
  let service: ServiceMeshService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceMeshService]
    }).compile();

    service = module.get<ServiceMeshService>(ServiceMeshService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
