import { Test, TestingModule } from "@nestjs/testing";

import { StorageClassController } from "./storage-class.controller";

describe("StorageClassController", () => {
  let storageClassController: StorageClassController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StorageClassController]
    }).compile();

    storageClassController = module.get<StorageClassController>(StorageClassController);
  });

  it("should be defined", () => {
    expect(storageClassController).toBeDefined();
  });
});
