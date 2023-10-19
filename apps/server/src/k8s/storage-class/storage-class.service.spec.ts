import { Test, TestingModule } from "@nestjs/testing";

import { StorageClassService } from "./storage-class.service";

describe("StorageClassService", () => {
  let storageClassService: StorageClassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorageClassService]
    }).compile();

    storageClassService = module.get<StorageClassService>(StorageClassService);
  });

  it("should be defined", () => {
    expect(storageClassService).toBeDefined();
  });
});
