import { desc, sql } from "drizzle-orm";
import { type DatabaseConnection } from "@reading-list/shared-database/connection";
import { articleTags } from "@reading-list/shared-database/schema";

export type Tag = Awaited<ReturnType<typeof fetchAvailableTags>>[number];

export async function fetchAvailableTags(db: DatabaseConnection) {
  return db
    .select({
      name: articleTags.tag,
      total: sql<number>`count(${articleTags.tag})`.as("total"),
    })
    .from(articleTags)
    .groupBy(articleTags.tag)
    .orderBy(({ total }) => desc(total));
}
