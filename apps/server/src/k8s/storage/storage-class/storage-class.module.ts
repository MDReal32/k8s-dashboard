import { Module } from "@nestjs/common";

import { StorageClassController } from "./storage-class.controller";
import { StorageClassGateway } from "./storage-class.gateway";
import { StorageClassService } from "./storage-class.service";

@Module({
  controllers: [StorageClassController],
  providers: [StorageClassGateway, StorageClassService],
  exports: [StorageClassService]
})
export class StorageClassModule {}
