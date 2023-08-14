import { Module } from "@nestjs/common";
import { SecretController } from "./secret.controller";
import { SecretGateway } from "./secret.gateway";
import { SecretService } from "./secret.service";

@Module({
  controllers: [SecretController],
  providers: [SecretGateway, SecretService]
})
export class SecretModule {}
