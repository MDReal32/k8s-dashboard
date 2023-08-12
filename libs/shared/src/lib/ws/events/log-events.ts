import { actionEvent } from "../events";

export const LOG_EVENTS = {
  ...actionEvent("log", "log", "receive", "listen")
};
