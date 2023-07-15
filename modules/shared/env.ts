import "dotenv/config";
import { z } from "zod";

export const env = {
  OTP_SECRET: z.string().parse(process.env.OTP_SECRET),
  OTP_USER: z.string().parse(process.env.OTP_USER),
  OTP_SERVICE: z.string().parse(process.env.OTP_SERVICE),

  VERCEL: z.any().optional().parse(process.env.VERCEL),
  VERCEL_ENV: z.enum(["production", "preview", "development"]).optional().parse(process.env.VERCEL_ENV),
  
  DATABASE_HOST: z.string().parse(process.env.DATABASE_HOST),
  DATABASE_USERNAME: z.string().parse(process.env.DATABASE_USERNAME),
  DATABASE_PASSWORD: z.string().parse(process.env.DATABASE_PASSWORD),
  DATABASE_URL: z.string().parse(process.env.DATABASE_URL),
}
