import { Injectable } from "@nestjs/common";

import { Logger } from "@ugrab/k8s-shared";

@Injectable()
export class GitService {
  private readonly logger = new Logger("GitService");
}
