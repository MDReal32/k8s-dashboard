import { Test, TestingModule } from "@nestjs/testing";
import { PersistentVolumeService } from "./persistent-volume.service";

describe("PersistentVolumeService", () => {
  let service: PersistentVolumeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersistentVolumeService]
    }).compile();

    service = module.get<PersistentVolumeService>(PersistentVolumeService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
