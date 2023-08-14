import { Test, TestingModule } from "@nestjs/testing";
import { PersistentVolumeClaimGateway } from "./persistent-volume-claim.gateway";

describe("PersistentVolumeClaimGateway", () => {
  let gateway: PersistentVolumeClaimGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersistentVolumeClaimGateway]
    }).compile();

    gateway = module.get<PersistentVolumeClaimGateway>(PersistentVolumeClaimGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
