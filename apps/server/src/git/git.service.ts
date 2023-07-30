import { Injectable } from "@nestjs/common";

import { Logger } from "../main";

@Injectable()
export class GitService {
  private readonly logger = new Logger("GitService");
}
