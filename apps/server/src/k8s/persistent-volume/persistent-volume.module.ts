import { Module } from "@nestjs/common";
import { PersistentVolumeController } from "./persistent-volume.controller";
import { PersistentVolumeGateway } from "./persistent-volume.gateway";
import { PersistentVolumeService } from "./persistent-volume.service";

@Module({
  controllers: [PersistentVolumeController],
  providers: [PersistentVolumeGateway, PersistentVolumeService]
})
export class PersistentVolumeModule {}
