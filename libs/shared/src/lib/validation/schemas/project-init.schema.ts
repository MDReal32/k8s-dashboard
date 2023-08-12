import { z } from "zod";

import { GITHUB_VALIDATE_RE } from "../../regex";

export const projectInitSchema = z.object({
  name: z.string({ description: "Name of project" }).optional(),
  repo: z
    .object({
      url: z
        .string()
        .describe("Cloneable repository url")
        .url("Invalid Url")
        .regex(GITHUB_VALIDATE_RE, "Invalid Github repository url"),
      branch: z.string().describe("Repository cloning branch").optional(),
      ssh: z.boolean().describe("Clone via ssh or https").optional()
    })
    .optional(),
  ci: z
    .object({
      dir: z.string().describe("CI directory relative to root").optional(),
      provider: z
        .enum(["docker", "docker-compose", "k8s", "kubernetes", "helm"])
        .describe("Pre-defined CI provider")
        .optional()
    })
    .optional()
});
