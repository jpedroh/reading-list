import { desc, sql } from "drizzle-orm";
import { articleTags, db } from "@reading-list/shared-database";

export type Tag = Awaited<ReturnType<typeof fetchAvailableTags>>[number];

export async function fetchAvailableTags() {
  return db
    .select({
      name: articleTags.tag,
      total: sql<number>`count(${articleTags.tag})`.as("total"),
    })
    .from(articleTags)
    .groupBy(articleTags.tag)
    .orderBy(({ total }) => desc(total));
}
