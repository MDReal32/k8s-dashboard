import { ProjectInitDto } from "./dto/project-init.dto";

export const projectDefaultOptions: ProjectInitDto = {
  name: null,
  repo: {},
  ci: {
    dir: "."
  }
};
