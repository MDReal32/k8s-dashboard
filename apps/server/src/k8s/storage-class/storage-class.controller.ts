import { Controller, Get, Param, Query } from "@nestjs/common";

import { StorageClassService } from "./storage-class.service";

@Controller(["k8s/v1/namespace/:namespace/resource/storage-class", "k8s/v1/storage-class"])
export class StorageClassController {
  constructor(private readonly storageClassService: StorageClassService) {}

  @Get()
  getStorageClassResource() {
    return this.storageClassService.getStorageClassResource();
  }
}
