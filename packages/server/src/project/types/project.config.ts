interface ProjectConfigGit {
  owner: string;
  repo: string;
  branch: string;
  ssh: boolean;
}

interface ProjectConfigCi {
  dir: string;
}

interface ProjectConfigSetup {
  done: boolean;
}

export interface ProjectConfig {
  name: string;
  git: ProjectConfigGit;
  ci: ProjectConfigCi;
  setup: ProjectConfigSetup;
}
