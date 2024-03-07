import { createClient } from "@libsql/client";
import { env } from "@reading-list/modules/shared/env";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

export * from "./schema";

const client = createClient({
  url: env.TURSO_CONNECTION_URL,
  authToken: env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });
