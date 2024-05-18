import "dotenv/config";

import type { Config } from "drizzle-kit";

export default {
  schema: "./src/modules/shared/database/src/schema.ts",
  out: "./drizzle/generated",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
} satisfies Config;
