import { Logger, Module, OnModuleInit } from "@nestjs/common";

import { StorageClassModule } from "./storage-class/storage-class.module";
import { StorageService } from "./storage.service";

@Module({
  imports: [StorageClassModule],
  providers: [StorageService, Logger],
  exports: [StorageService]
})
export class StorageModule implements OnModuleInit {
  constructor(private readonly appsService: StorageService) {}

  async onModuleInit() {
    await this.appsService.init();
  }
}
