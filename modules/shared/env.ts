import { z } from "zod";

const envSchema = z.object({
  OTP_SECRET: z.string(),
  OTP_USER: z.string(),
  OTP_SERVICE: z.string(),
  VERCEL: z.any().optional(),
});

export const env = envSchema.parse(process.env);
