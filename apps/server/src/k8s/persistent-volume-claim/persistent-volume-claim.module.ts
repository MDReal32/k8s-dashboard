import { Module } from "@nestjs/common";
import { PersistentVolumeClaimController } from "./persistent-volume-claim.controller";
import { PersistentVolumeClaimGateway } from "./persistent-volume-claim.gateway";
import { PersistentVolumeClaimService } from "./persistent-volume-claim.service";

@Module({
  controllers: [PersistentVolumeClaimController],
  providers: [PersistentVolumeClaimGateway, PersistentVolumeClaimService]
})
export class PersistentVolumeClaimModule {}
