import { Test, TestingModule } from "@nestjs/testing";
import { PersistentVolumeClaimController } from "./persistent-volume-claim.controller";

describe("PersistentVolumeClaimController", () => {
  let controller: PersistentVolumeClaimController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersistentVolumeClaimController]
    }).compile();

    controller = module.get<PersistentVolumeClaimController>(PersistentVolumeClaimController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
