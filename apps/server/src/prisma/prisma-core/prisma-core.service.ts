import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client-core";

@Injectable()
export class PrismaCoreService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
