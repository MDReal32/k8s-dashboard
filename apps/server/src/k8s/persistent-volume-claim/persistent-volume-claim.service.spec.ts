import { Test, TestingModule } from "@nestjs/testing";
import { PersistentVolumeClaimService } from "./persistent-volume-claim.service";

describe("PersistentVolumeClaimService", () => {
  let service: PersistentVolumeClaimService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersistentVolumeClaimService]
    }).compile();

    service = module.get<PersistentVolumeClaimService>(PersistentVolumeClaimService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
