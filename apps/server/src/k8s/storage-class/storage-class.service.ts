import { Injectable, Logger } from "@nestjs/common";

import { K8sService } from "../../base/k8s.service";

@Injectable()
export class StorageClassService extends K8sService {
  constructor() {
    super(new Logger(StorageClassService.name));
  }

  async getStorageClassResource() {
    const storageClasss = await this.catch(this.k8sStorageApi.listStorageClass());
    return storageClasss.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/apis/storage.k8s.io/v1/storageclasses");
  }
}
