import type { Config } from "drizzle-kit";
import { env } from "./modules/shared/env";

export default {
  schema: "./modules/shared/database.ts",
  out: "./drizzle/generated",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
  driver: "mysql2"
} satisfies Config;
