import { Injectable, Logger } from "@nestjs/common";

import { K8sService } from "../../../base/k8s.service";

@Injectable()
export class ClusterRoleBindingService extends K8sService {
  constructor() {
    super(new Logger(ClusterRoleBindingService.name));
  }

  async getClusterRoleBindingResource() {
    const clusterRoleBindings = await this.catch(
      this.k8sRbacAuthorization.listRoleBindingForAllNamespaces()
    );
    return clusterRoleBindings.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/apis/rbac.authorization.k8s.io/v1/clusterrolebindings");
  }
}
