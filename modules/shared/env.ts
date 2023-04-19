import { z } from "zod";

const envSchema = z.object({
  OTP_SECRET: z.string(),
  OTP_USER: z.string(),
  OTP_SERVICE: z.string(),
  VERCEL: z.any().optional(),
  VERCEL_ENV: z.enum(["production", "preview", "development"]).optional(),
  DATABASE_HOST: z.string(),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
});

export const env = envSchema.parse(process.env);
