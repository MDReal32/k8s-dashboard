import { Test, TestingModule } from "@nestjs/testing";
import { PersistentVolumeGateway } from "./persistent-volume.gateway";

describe("PersistentVolumeGateway", () => {
  let gateway: PersistentVolumeGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersistentVolumeGateway]
    }).compile();

    gateway = module.get<PersistentVolumeGateway>(PersistentVolumeGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
