import { Test, TestingModule } from "@nestjs/testing";
import { ServiceMeshGateway } from "./service-mesh.gateway";

describe("ServiceMeshGateway", () => {
  let gateway: ServiceMeshGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceMeshGateway]
    }).compile();

    gateway = module.get<ServiceMeshGateway>(ServiceMeshGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
