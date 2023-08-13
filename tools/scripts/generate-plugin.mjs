import { spawn } from "node:child_process";

if (!process.argv[2]) {
  console.error("Please provide a plugin name");
  process.exit(1);
}

const name = process.argv[2];
const cmd = `rm -rf plugins/plugin-${name} && nx g @k8sd/plugin-builder:plugin plugin-${name} --scope=k8sd`;
spawn(cmd, { stdio: "inherit", shell: true }).on("exit", code => {
  if (!code) {
    spawn("yarn", { stdio: "inherit", shell: true });
  }
});
