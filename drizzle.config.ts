import "dotenv/config";

import type { Config } from "drizzle-kit";

if (!process.env.TURSO_CONNECTION_URL) {
  throw new Error("TURSO_CONNECTION_URL is not set");
}

if (!process.env.TURSO_AUTH_TOKEN) {
  throw new Error("TURSO_AUTH_TOKEN is not set");
}

export default {
  schema: "./src/modules/shared/database/src/schema.ts",
  out: "./drizzle/generated",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
} satisfies Config;
