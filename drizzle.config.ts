import type { Config } from "drizzle-kit";
import z from "zod";

const DATABASE_URL = z.string().parse(process.env.DATABASE_URL);

export default {
  schema: "./modules/shared/database.ts",
  out: "./drizzle/generated",
  dbCredentials: {
    connectionString: DATABASE_URL,
  },
  driver: "mysql2",
} satisfies Config;
