import { Logger, Module } from "@nestjs/common";

import { IngressModule } from "./ingress/ingress.module";
import { NetworkService } from "./network.service";

@Module({
  imports: [IngressModule],
  providers: [NetworkService, Logger],
  exports: [NetworkService]
})
export class NetworkModule {}
