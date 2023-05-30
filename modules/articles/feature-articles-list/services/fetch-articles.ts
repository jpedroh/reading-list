import { desc } from "drizzle-orm";
import { articles, db } from "../../../shared/database";

export async function fetchArticles() {
  const rows = await db.query.articles.findMany({
    with: { articleTags: true },
    orderBy: [desc(articles.addedAt)],
  });

  return rows.map(({ articleTags, ...article }) => {
    return { ...article, tags: articleTags.map((a) => a.tag) };
  });
}
