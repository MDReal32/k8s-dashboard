import { actionEvent } from "../events";

export const LOG_EVENTS = {
  LOG: actionEvent("ws-events::log", "success", "error")
};
