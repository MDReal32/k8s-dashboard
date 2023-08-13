import { z, ZodType } from "zod";

export type Data<ZodSchema extends ZodType, PrismaModel> = z.infer<ZodSchema> &
  Partial<PrismaModel>;
