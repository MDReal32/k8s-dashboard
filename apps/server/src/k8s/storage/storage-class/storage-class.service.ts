import { Injectable, Logger } from "@nestjs/common";

import { K8sService } from "../../../base/k8s.service";
import { StorageService } from "../storage.service";

@Injectable()
export class StorageClassService extends StorageService {
  constructor() {
    super(new Logger(StorageClassService.name));
  }

  async getStorageClassResource() {
    const storageClasses = await this.catch(this.k8sApi.listStorageClass());
    return storageClasses.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/apis/storage.k8s.io/v1/storageclasses");
  }
}
