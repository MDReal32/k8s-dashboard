import { Test, TestingModule } from "@nestjs/testing";

import { StorageClassGateway } from "./storage-class.gateway";

describe("StorageClassGateway", () => {
  let storageClassGateway: StorageClassGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorageClassGateway]
    }).compile();

    storageClassGateway = module.get<StorageClassGateway>(StorageClassGateway);
  });

  it("should be defined", () => {
    expect(storageClassGateway).toBeDefined();
  });
});
