import { Test, TestingModule } from "@nestjs/testing";
import { StorageClassGateway } from "./storage-class.gateway";

describe("StorageClassGateway", () => {
  let gateway: StorageClassGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorageClassGateway]
    }).compile();

    gateway = module.get<StorageClassGateway>(StorageClassGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
