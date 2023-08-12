import * as process from "node:process";

import { Plugin, PluginContext } from "@k8sd/plugin-builder";
import { CommandBuilder } from "@k8sd/plugin-sdk";

import * as pkgJson from "../package.json";

const getFile = (ctx: PluginContext) => {
  const dockerfile = ctx.find(ctx.ciRoot, file => file.name === "Dockerfile");
  const dockerComposeFile = ctx.find(ctx.ciRoot, file => file.name === "docker-compose.yml");

  return {
    dockerfile: dockerfile?.stats.isFile() && dockerfile.stats.size > 0,
    dockerCompose: dockerComposeFile?.stats.isFile() && dockerComposeFile.stats.size > 0
  };
};

const checkDocker = (ctx: PluginContext) => {
  let docker = false;
  let dockerCompose = false;
  let dockerBuildX = false;

  try {
    ctx.executor.sync("docker --version");
    docker = true;
  } catch {}

  try {
    ctx.executor.sync("docker compose version");
    dockerCompose = true;
  } catch {}

  try {
    ctx.executor.sync("docker buildx version");
    dockerBuildX = true;
  } catch {}

  return { docker, dockerCompose, dockerBuildX };
};

const archs: Record<typeof process.arch, string> = {
  x64: "amd64",
  arm: "arm",
  arm64: "arm64",
  ia32: "386",
  mips: "mips",
  mipsel: "mipsel",
  ppc: "ppc64",
  ppc64: "ppc64le",
  s390: "s390x",
  s390x: "s390x"
};

const getArch = (arch?: typeof process.arch) => archs[arch] || archs[process.arch] || archs.x64;

export const plugin = (): Plugin => {
  return {
    name: pkgJson.name,
    description: pkgJson.description,
    version: pkgJson.version,

    detect(ctx) {
      ctx.logger.log(`Detecting provider using ${pkgJson.name}`);
      const foundFiles = getFile(ctx);
      return foundFiles.dockerfile || foundFiles.dockerCompose;
    },

    async install(ctx) {
      ctx.logger.log(`Installing provider using ${pkgJson.name}`);
      const foundFiles = getFile(ctx);
      const { docker, dockerCompose, dockerBuildX } = checkDocker(ctx);

      if (!docker) {
        throw new Error("Docker is not installed");
      }

      if (foundFiles.dockerCompose && !dockerCompose) {
        throw new Error("Docker Compose is not installed");
      }

      const platform = `${process.platform}/${getArch()}`;

      const cmd = new CommandBuilder("docker");

      if (foundFiles.dockerCompose) {
        cmd.addCommand("compose").addCommand("up").addFlag("d").addFlag("build");
      } else if (dockerBuildX) {
        cmd
          .setSeparator("=")
          .addCommand("buildx")
          .addCommand("build")
          .addArgument("platform", platform);
      } else {
        cmd
          .addCommand("build")
          .addArgument("t", ctx.name)
          .addArgv(".")
          .and()
          .addCommand("run")
          .addFlag("d")
          .addArgv(ctx.name);
      }

      return ctx.task(async () => {
        ctx.logger.log(`Building image for ${ctx.name}`);
        await ctx.executor.run(cmd.toString());
      });
    }
  };
};
