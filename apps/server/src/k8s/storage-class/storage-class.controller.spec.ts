import { Test, TestingModule } from "@nestjs/testing";
import { StorageClassController } from "./storage-class.controller";

describe("StorageClassController", () => {
  let controller: StorageClassController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StorageClassController]
    }).compile();

    controller = module.get<StorageClassController>(StorageClassController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
