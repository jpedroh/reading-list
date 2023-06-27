import type { Config } from "drizzle-kit";
import "dotenv/config";

import { env } from "process";

export default {
  schema: "./modules/shared/database.ts",
  dbCredentials: {
    url: env.DATABASE_URL ?? "",
  }
} satisfies Config;
