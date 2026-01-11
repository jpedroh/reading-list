import {
  makeDatabaseConnection,
  type DatabaseConnection,
} from "@reading-list/shared-database/connection";
import handler, { createServerEntry } from "@tanstack/react-start/server-entry";
import { env } from "cloudflare:workers";

type RequestContext = {
  db: DatabaseConnection;
};

declare module "@tanstack/react-start" {
  interface Register {
    server: {
      requestContext: RequestContext;
    };
  }
}

const db = makeDatabaseConnection({
  authToken: env.TURSO_AUTH_TOKEN,
  url: env.TURSO_CONNECTION_URL,
});

export default createServerEntry({
  async fetch(request) {
    return handler.fetch(request, { context: { db } });
  },
});
