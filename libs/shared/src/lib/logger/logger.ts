import { Logger as _Logger } from "@nestjs/common";
import { ConsoleLogger } from "./console-logger";

export class Logger extends _Logger {
  constructor(
    context: string,
    private readonly appName: string | null = null
  ) {
    super(context);
    this.localInstanceRef = new ConsoleLogger(context, appName);
  }
}
