import { appendFileSync, existsSync } from "node:fs";

import { Logger as _Logger, LogLevel } from "@nestjs/common/services/logger.service";
import {
  ConsoleLogger as _ConsoleLogger,
  ConsoleLoggerOptions
} from "@nestjs/common/services/console-logger.service";

class ConsoleLogger extends _ConsoleLogger {
  constructor(
    context: string,
    private readonly internalOptions: { appName: string; file: string },
    options?: ConsoleLoggerOptions
  ) {
    super(context, { timestamp: options?.timestamp || false, logLevels: options?.logLevels });
  }

  protected override formatPid(pid: number): string {
    if (this.internalOptions.appName.length > 4) {
      throw new Error("AppName must be less than 5 characters");
    }

    const appName = this.internalOptions.appName?.padStart(4, " ");
    return super.formatPid(pid).replace("Nest", appName || "K8SD");
  }

  protected override formatMessage(
    logLevel: LogLevel,
    message: unknown,
    pidMessage: string,
    formattedLogLevel: string,
    contextMessage: string,
    timestampDiff: string
  ): string {
    const formattedMessage = super.formatMessage(
      logLevel,
      message,
      pidMessage,
      formattedLogLevel,
      contextMessage,
      timestampDiff
    );
    if (this.internalOptions.file && existsSync(this.internalOptions.file)) {
      appendFileSync(this.internalOptions.file, formattedMessage);
    }
    return formattedMessage;
  }
}

export class Logger extends _Logger {
  private readonly appName = process.env["APP_NAME"] || "K8SD";
  private readonly file = process.env["LOG_FILE"] || "k8sd.log";

  constructor(context: string, options?: { timestamp: boolean }) {
    super(context, options);
    this.localInstanceRef = new ConsoleLogger(
      context,
      { appName: this.appName, file: this.file },
      { timestamp: options?.timestamp || true }
    );
  }
}
