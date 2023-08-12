import { z } from "zod";
import { $Enums } from "@prisma/client";

import { GITHUB_VALIDATE_RE } from "../../regex";

export const projectInitSchema = z.object({
  name: z.string({ description: "Name of project" }),
  status: z
    .enum([
      $Enums.Status.PROJECT_CREATING,
      $Enums.Status.PROJECT_INITIALIZING,
      $Enums.Status.PROJECT_INITIALIZED,
      $Enums.Status.RETRIEVING_PROVIDER,
      $Enums.Status.INSTALLING_PROVIDER,
      $Enums.Status.PROVIDER_INSTALLED
    ])
    .optional(),
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
      provider: z.string().describe("Pre-defined CI provider").optional()
    })
    .optional()
});
