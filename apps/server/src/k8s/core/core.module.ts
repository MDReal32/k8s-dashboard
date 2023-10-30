import { Logger, Module } from "@nestjs/common";

import { ConfigMapModule } from "./config-map/config-map.module";
import { CoreService } from "./core.service";
import { EndpointModule } from "./endpoint/endpoint.module";
import { NamespaceModule } from "./namespace/namespace.module";
import { NodeModule } from "./node/node.module";
import { PodModule } from "./pod/pod.module";
import { SecretModule } from "./secret/secret.module";
import { ServiceAccountModule } from "./service-account/service-account.module";
import { ServiceModule } from "./service/service.module";

@Module({
  imports: [
    NodeModule,
    NamespaceModule,
    ServiceAccountModule,
    ServiceModule,
    PodModule,
    ConfigMapModule,
    SecretModule,
    EndpointModule
  ],
  providers: [CoreService, Logger],
  exports: [CoreService]
})
export class CoreModule {}
