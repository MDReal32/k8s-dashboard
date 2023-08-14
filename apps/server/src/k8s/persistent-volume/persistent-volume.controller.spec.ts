import { Test, TestingModule } from "@nestjs/testing";
import { PersistentVolumeController } from "./persistent-volume.controller";

describe("PersistentVolumeController", () => {
  let controller: PersistentVolumeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersistentVolumeController]
    }).compile();

    controller = module.get<PersistentVolumeController>(PersistentVolumeController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
