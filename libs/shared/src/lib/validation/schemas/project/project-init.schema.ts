import { z } from "zod";

import { GITHUB_CREDENTIALS_RE, GITHUB_VALIDATE_RE } from "../../../regex";

export const projectInitSchema = z.object({
  name: z.string({ description: "Name of project" }),
  repo: z.object({
    url: z.string().regex(GITHUB_VALIDATE_RE, "Must be a valid GitHub URL"),
    credentials: z
      .object({ username: z.string(), password: z.string() })
      .or(z.string().regex(GITHUB_CREDENTIALS_RE))
  }),
  ci: z.object({ type: z.string() })
});
