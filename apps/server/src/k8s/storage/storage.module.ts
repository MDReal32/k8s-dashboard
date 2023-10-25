import { Logger, Module } from "@nestjs/common";

import { StorageClassModule } from "./storage-class/storage-class.module";
import { StorageService } from "./storage.service";

@Module({
  imports: [StorageClassModule],
  providers: [StorageService, Logger],
  exports: [StorageService]
})
export class StorageModule {}
