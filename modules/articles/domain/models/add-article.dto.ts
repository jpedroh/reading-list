import { z } from "zod";

export const AddArticleSchema = z.object({
  url: z.string().url(),
  title: z.string(),
  tags: z.preprocess((x) => (Array.isArray(x) ? x : [x]), z.array(z.string())),
  otp: z.string().max(6),
});
