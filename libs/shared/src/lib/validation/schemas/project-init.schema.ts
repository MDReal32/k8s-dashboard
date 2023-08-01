import { z } from "zod";

export const projectInitSchema = z.object({
  name: z.string().optional(),
  repositoryUrl: z.string(),
  ciDir: z.string().optional(),
  ssh: z.boolean().optional(),
  branch: z.string().optional()
});
