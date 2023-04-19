import { eq } from "drizzle-orm";
import { Article, articleTags, articles, db } from "../../../infra/database";

export async function fetchArticles() {
  const rows = await db
    .select()
    .from(articles)
    .leftJoin(articleTags, eq(articles.id, articleTags.articleId));

  const result = rows.reduce<
    Record<
      string,
      Omit<Article, "addedAt"> & { addedAt: string } & { tags: string[] }
    >
  >((acc, row) => {
    const article = row.Article;
    const tag = row.ArticleTag;

    if (!acc[article.id]) {
      acc[article.id] = {
        ...article,
        addedAt: article.addedAt.toDateString(),
        tags: [],
      };
    }

    if (tag) {
      acc[article.id].tags.push(tag.tag);
    }

    return acc;
  }, {});

  return Object.values(result);
}
