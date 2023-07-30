import { dirname, resolve } from "node:path";
import { mkdirSync, appendFileSync } from "node:fs";

import { ConsoleLogger as _ConsoleLogger, LogLevel } from "@nestjs/common";

export class ConsoleLogger extends _ConsoleLogger {
  private readonly commonLogFileLocation = resolve(
    process.env["PROJECT_CWD"] || process.cwd(),
    "logs/log.log"
  );

  constructor(
    context: string,
    private readonly appName: string | null = null
  ) {
    super(context);
  }

  protected override formatPid(pid: number) {
    const pidFormat = super.formatPid(pid);
    return this.appName ? pidFormat.replace("Nest", this.capitalize(this.appName)) : pidFormat;
  }

  private capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
