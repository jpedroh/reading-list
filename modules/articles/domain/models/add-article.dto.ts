import { z } from "zod";

export const AddArticleSchema = z.object({
  url: z.string().url(),
  tags: z.preprocess((x) => (Array.isArray(x) ? x : [x]), z.array(z.string())),
  otp: z.string().max(6),
});

export type AddArticleDto = z.infer<typeof AddArticleSchema>;
