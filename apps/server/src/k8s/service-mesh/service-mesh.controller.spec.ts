import { Test, TestingModule } from "@nestjs/testing";
import { ServiceMeshController } from "./service-mesh.controller";

describe("ServiceMeshController", () => {
  let controller: ServiceMeshController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceMeshController]
    }).compile();

    controller = module.get<ServiceMeshController>(ServiceMeshController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
