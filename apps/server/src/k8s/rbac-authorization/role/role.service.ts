import { Injectable, Logger } from "@nestjs/common";

import { K8sService } from "../../../base/k8s.service";

@Injectable()
export class RoleService extends K8sService {
  constructor() {
    super(new Logger(RoleService.name));
  }

  async getRoleResource(namespace: string) {
    this.expect(namespace, "namespace");

    const roles = await this.catch(
      namespace === "_"
        ? this.k8sRbacAuthorization.listRoleForAllNamespaces()
        : this.k8sRbacAuthorization.listNamespacedRole(namespace)
    );
    return roles.body.items;
  }

  k8sWatch() {
    return super.k8sWatcher("someEndpoint");
  }
}
