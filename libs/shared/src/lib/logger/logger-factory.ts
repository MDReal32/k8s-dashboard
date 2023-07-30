import { Logger } from "./logger";

export const loggerFactory = (appName: string | null = null): typeof Logger => {
  return class extends Logger {
    constructor(context: string) {
      super(context, appName);
    }
  };
};
