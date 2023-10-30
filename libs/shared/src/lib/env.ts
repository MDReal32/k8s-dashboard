import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.string(),
  PROJECT_CWD: z.string(),
  SERVER_ADDRESS: z.string(),

  POSTGRES_CORE_HOST: z.string(),
  POSTGRES_CORE_PORT: z.string(),
  POSTGRES_CORE_USER: z.string(),
  POSTGRES_CORE_PASSWORD: z.string(),
  POSTGRES_CORE_DB: z.string(),
  POSTGRES_CORE_DATABASE_URL: z.string(),

  POSTGRES_LOGS_HOST: z.string(),
  POSTGRES_LOGS_PORT: z.string(),
  POSTGRES_LOGS_USER: z.string(),
  POSTGRES_LOGS_PASSWORD: z.string(),
  POSTGRES_LOGS_DB: z.string(),
  POSTGRES_LOGS_DATABASE_URL: z.string()
});

export const env = envSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
