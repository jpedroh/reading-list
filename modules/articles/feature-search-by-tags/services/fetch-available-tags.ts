import { desc, sql } from "drizzle-orm";
import { articleTags, db } from "../../../shared/database";

export async function fetchAvailableTags() {
  return db
    .select({
      name: articleTags.tag,
      total: sql<number>`count(${articleTags.tag})::int`.as("total"),
    })
    .from(articleTags)
    .groupBy(articleTags.tag)
    .orderBy(({ total }) => desc(total));
}
