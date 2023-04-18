import { z } from "zod";

const envSchema = z.object({
  OTP_SECRET: z.string(),
  OTP_USER: z.string(),
  OTP_SERVICE: z.string(),
  VERCEL: z.any().optional(),
  VERCEL_ENV: z.enum(["production", "preview", "development"]).optional(),
  VERCEL_URL: z.string(),
});

export const env = envSchema.parse(process.env);
