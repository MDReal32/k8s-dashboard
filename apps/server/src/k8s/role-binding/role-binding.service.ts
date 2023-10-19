import { Injectable, Logger } from "@nestjs/common";

import { K8sService } from "../../base/k8s.service";

@Injectable()
export class RoleBindingService extends K8sService {
  constructor() {
    super(new Logger(RoleBindingService.name));
  }

  async getRoleBindingResource(namespace: string) {
    this.expect(namespace, "namespace");

    const roleBindings = await this.catch(
      namespace === "_"
        ? this.k8sRbacAuthorization.listRoleBindingForAllNamespaces()
        : this.k8sRbacAuthorization.listNamespacedRoleBinding(namespace)
    );
    return roleBindings.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("/apis/rbac.authorization.k8s.io/v1/rolebindings");
  }
}
