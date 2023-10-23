import { Module } from "@nestjs/common";

import { PrismaCoreService } from "./prisma-core.service";

@Module({
  providers: [PrismaCoreService],
  exports: [PrismaCoreService]
})
export class PrismaCoreModule {}
