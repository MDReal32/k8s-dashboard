import { projectInitSchema } from "./project-init.schema";

export const projectUpdateSchema = projectInitSchema.omit({ name: true });
