import { Injectable, Logger } from "@nestjs/common";

import { K8sService } from "../../../base/k8s.service";
import { RbacAuthorizationService } from "../rbac-authorization.service";

@Injectable()
export class ClusterRoleBindingService extends RbacAuthorizationService {
  constructor() {
    super(new Logger(ClusterRoleBindingService.name));
  }

  async getClusterRoleBindingResource() {
    const clusterRoleBindings = await this.catch(this.k8sApi.listRoleBindingForAllNamespaces());
    return clusterRoleBindings.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/apis/rbac.authorization.k8s.io/v1/clusterrolebindings");
  }
}
