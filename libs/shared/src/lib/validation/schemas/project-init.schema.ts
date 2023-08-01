import { z } from "zod";

export const projectInitSchema = z.object({
  name: z.string(),
  repo: z.object({
    url: z.string().url("Invalid URL"),
    branch: z.string(),
    ssh: z.boolean()
  }),
  ci: z.object({
    dir: z.string(),
    provider: z.enum(["docker", "docker-compose", "k8s", "kubernetes", "helm"])
  })
});
