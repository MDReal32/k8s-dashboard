import { Test, TestingModule } from "@nestjs/testing";
import { StorageClassService } from "./storage-class.service";

describe("StorageClassService", () => {
  let service: StorageClassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorageClassService]
    }).compile();

    service = module.get<StorageClassService>(StorageClassService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
