import { z } from "zod";

const env = z.object({
  NODE_ENV: z.string(),
  PROJECT_CWD: z.string(),
  STORAGE_ROOT: z.string(),

  SERVER_PORT: z.string(),
  SERVER_HOST: z.string(),
  BASE_URL: z.string(),
  WS_PATH: z.string(),

  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  DB_URL: z.string()
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof env> {}
  }
}
