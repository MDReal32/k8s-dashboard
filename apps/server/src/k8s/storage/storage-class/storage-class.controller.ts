import { Controller, Get } from "@nestjs/common";

import { ResourceTypes } from "@k8sd/shared";

import { StorageClassService } from "./storage-class.service";

@Controller([`k8s/v1/${ResourceTypes.STORAGE_CLASS}`])
export class StorageClassController {
  constructor(private readonly storageClassService: StorageClassService) {}

  @Get()
  getStorageClassResource() {
    return this.storageClassService.getStorageClassResource();
  }
}
