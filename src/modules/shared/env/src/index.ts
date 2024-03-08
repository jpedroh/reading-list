import { z } from "zod";

export const env = {
  OTP_SECRET: z.string().parse(process.env.OTP_SECRET),
  OTP_USER: z.string().parse(process.env.OTP_USER),
  OTP_SERVICE: z.string().parse(process.env.OTP_SERVICE),

  VERCEL: z.any().optional().parse(process.env.VERCEL),
  VERCEL_ENV: z
    .enum(["production", "preview", "development"])
    .optional()
    .parse(process.env.VERCEL_ENV),

  TURSO_CONNECTION_URL: z.string().parse(process.env.TURSO_CONNECTION_URL),
  TURSO_AUTH_TOKEN: z.string().parse(process.env.TURSO_AUTH_TOKEN),
};
