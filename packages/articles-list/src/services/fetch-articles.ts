import type { DatabaseConnection } from "@reading-list/shared-database/connection";

export type Article = Awaited<ReturnType<typeof fetchArticles>>[0];

export async function fetchArticles(db: DatabaseConnection) {
  const rows = await db.query.articles.findMany({
    with: { articleTags: true },
    orderBy: (fields, { desc }) => [desc(fields.addedAt)],
  });

  return rows.map(({ articleTags, ...article }) => {
    return { ...article, tags: articleTags.map((a) => a.tag) };
  });
}
