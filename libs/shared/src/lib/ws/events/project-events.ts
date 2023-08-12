import { actionEvent } from "../events";

export const PROJECT_EVENTS = {
  ...actionEvent("setup", "project::setup", "success", "failure"),
  ...actionEvent("install", "project::install")
};
