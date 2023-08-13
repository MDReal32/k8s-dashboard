import { z } from "zod";

export const createNamespaceSchema = z.object({
  name: z.string({ description: "Name of namespace" })
});
